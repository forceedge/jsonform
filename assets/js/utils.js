// Bit of a hack
jQuery('.form-actions').remove();

// Hide the genrated forms
jQuery('form.generated-json').hide();

// Generates the JSON for both of the form submissions
function generateOutput (errors, values) {
  jQuery('form#main').submit();

  if(! mainJSON)
    return false;

  if(typeof values.meta !== "undefined") {
    // Prepare meta values to be extracted and reformatted
    values.meta = $.extend(true, {}, values, arrayToProperObject(values.meta));

    for(var propertyName in values.meta) {
      if(typeof propertyName == 'undefined') {
        values = $.extend(true, {}, values, arrayToProperObject(values.meta));
      } else {
        // Write to clean property as we are going to delete the meta later
        if(typeof values.meta[propertyName][0] == 'undefined') {
          // Extend the original
          values[propertyName.replace(/ /g, '_')] = $.extend(
            true, 
            {}, 
            values.meta[propertyName], 
            arrayToProperObject(values.meta[propertyName])
          );          
        } else {
          // Discard the original
          values[propertyName.replace(/ /g, '_')] = arrayToProperObject(values.meta[propertyName]);
        }
      }
    };

    // Get rid of the meta object created by JSONForm
    delete values.meta;
  }

  if (errors) {
    console.log(errors);
    $('#res').html('<p>I beg your pardon?</p>');
  }
  else {
    if (typeof values != 'string') {
      // merge the two json objects, mainJSON contains the generic info
      values = $.extend(true, {}, mainJSON, values);
      // Get rid of the extra field
      delete values._at['pointType'];

      // Stringify the json object for output
      json = JSON.stringify(values, undefined, 2).replace(/[\r\n]/g, '<br />');
    }

    // Display result in the res element
    $('#res').html('<pre>window.advocate_things_data = '+ json +'</pre>');
  }
};

// arrayToProperObject
function arrayToProperObject(arr) {
  var reformattedMeta = '', evaluated, finalJSON;

  if(arr.length > 0 && typeof arr == 'object') {
    // Go through each object
    arr.forEach(function(obj) {
      if(typeof obj.property !== 'undefined') {
        // Set property without spaces
        reformattedMeta += '"' + obj.property.replace(/ /g, '_') + '": ';

        if(typeof obj.value !== 'undefined') {
          // Value specified
          reformattedMeta += JSON.stringify(obj.value) + ',';
        } else {
          // No value specified
          reformattedMeta += '"",';
        }
      } else {
        // Deal with _at level properties
        reformattedMeta += JSON.stringify(arrayToProperObject(obj.value)).replace('{','').replace('}','') + ',';
      }
    });

    finalJSON = '{' + reformattedMeta.slice(0, -1) + '}';

    try {
      // creates a JSON object from string
      evaluated = JSON.parse(finalJSON.replace('"', '\"'));
    } catch (e) {
      console.warn('Invalid json: ' + finalJSON);
      evaluated = '';
    }
  } else {
    // creates a JSON object from string
    evaluated = arr;
  } 

  return evaluated;
}

// Switching between forms
jQuery("select[name='_at.pointType']").on('change', function() {
  // Reset stuff
  jQuery('form.generated-json').hide();
  jQuery('#res').empty();

  if($(this).val() == 'sharepoint') {
    jQuery('form#sharepoint-generate-json').show();
  } else if($(this).val() === 'touchpoint') {    
    jQuery('form#touchpoint-generate-json').show();
  }
});