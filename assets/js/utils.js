// Bit of a hack
jQuery('.form-actions').remove();

// Hide the genrated forms
jQuery('form.generated-json').hide();

var at_json_generator = {
  // Generates the JSON for both of the form submissions
  generateOutput: function (errors, values) {
    jQuery('form#main').submit();

    if(! mainJSON)
      return false;

    if(typeof values.meta !== "undefined") {
      // Prepare meta values to be extracted and reformatted
      values.meta = $.extend(true, {}, values, at_json_generator.arrayToProperObject(values.meta));

      for(var propertyName in values.meta) {
        if(typeof propertyName == 'undefined') {
          values = $.extend(true, {}, values, at_json_generator.arrayToProperObject(values.meta));
        } else {
          // Write to clean property as we are going to delete the meta later
          if(typeof values.meta[propertyName][0] == 'undefined') {
            // Extend the original
            values[propertyName.replace(/ /g, '_')] = $.extend(
              true, 
              {}, 
              values.meta[propertyName], 
              at_json_generator.arrayToProperObject(values.meta[propertyName])
            );          
          } else {
            // Discard the original
            values[propertyName.replace(/ /g, '_')] = at_json_generator.arrayToProperObject(values.meta[propertyName]);
          }
        }
      };

      // Get rid of the meta object created by JSONForm
      delete values.meta;
    }

    if (errors) {
      console.warn(errors);
      $('#res').html('<p>I beg your pardon?</p>');
    }
    else {
      json = at_json_generator.generateJSON(values);
      // Display result in the res element
      $('#res').html('<pre>window.advocate_things_data = '+ json +'</pre>');
    } 
  },
  generateJSON: function(values) {
    if (typeof values != 'string') {
      // merge the two json objects, mainJSON contains the generic info
      values = $.extend(true, {}, mainJSON, values);
      // Get rid of the extra field
      delete values._at['pointType'];

      // Stringify the json object for output
      json = JSON.stringify(values, undefined, 2).replace(/[\r\n]/g, '<br />');

      return json;
    }
  },

  // arrayToProperObject
  arrayToProperObject: function (arr) {
    var reformattedMeta = '', evaluated, finalJSON;

    if(arr.length > 0 && typeof arr == 'object') {
      // Go through each object
      arr.forEach(function(obj) {
        if(typeof obj.property !== 'undefined') {
          // Set property without spaces
          reformattedMeta += '"' + at_json_generator.filterJSONProperty(obj.property) + '": ';

          if(typeof obj.value !== 'undefined') {
            // Value specified
            reformattedMeta += at_json_generator.filterJSONValue(obj.value) + ',';
          } else {
            // No value specified
            reformattedMeta += '"",';
          }
        } else {
          // Deal with _at level properties
          reformattedMeta += at_json_generator.filterJSONValue(arrayToProperObject(obj.value)).replace('{','').replace('}','') + ',';
        }
      });

      finalJSON = '{' + reformattedMeta.slice(0, -1) + '}';

      try {
        console.log(finalJSON);
        // creates a JSON object from string
        evaluated = JSON.parse(finalJSON);
      } catch (e) {
        console.warn('Invalid json: ' + finalJSON);
        evaluated = '';
      }
    } else {
      // creates a JSON object from string
      evaluated = arr;
    } 

    return evaluated;
  },
  filterJSONProperty: function (str) {
    return str.replace(/ /g, '_').replace('"', '\"');
  },
  filterJSONValue: function (obj) {
    return JSON.stringify(obj).replace('"', '\"');
  },
  // Switching between forms
  attachOnChangeEvents: function() {
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
  }
}

at_json_generator.attachOnChangeEvents();