// Bit of a hack
jQuery('.form-actions').remove();

// Hide the genrated forms
jQuery('form.generated-json').hide();

var atJSONGenerator = {
  // Generates the JSON for both of the form submissions
  // Returns JSON object
  generateOutput: function (errors, values) {
    if(typeof values.meta !== "undefined") {
      // Prepare meta values to be extracted and reformatted
      values.meta = $.extend(
        true, 
        {}, 
        values,
        atJSONGenerator.arrayToProperObject(values.meta)
      );
      values = atJSONGenerator.filterProperties(values);

      // Get rid of the meta object created by JSONForm
      delete values.meta;
    }

    if (errors) {
      console.warn(errors);
      return false;
    }
    else {
      return values;
    } 
  },
  // Returns JSON string
  generateJSONString: function(values) {
    if (typeof values != 'string') {
      // If mainJSON is undefined
      if(typeof mainJSON == 'undefined') {
        mainJSON = {};
      }
      // merge the two json objects, mainJSON contains the generic info
      values = $.extend(true, {}, mainJSON, values);
      // Stringify the json object for output
      json = JSON.stringify(values, undefined, 2).replace(/[\r\n]/g, '<br />');

      return json;
    }
  },
  generateInvalidJSONStringForSQL: function(values) {
    var sql = '[';
    var field = '';

    // Touchpoint sum, field is an extra param
    if(typeof values.field !== 'undefined') {
      field = 'client_metadata.' + values.field + ', ';
    }

    sql += values.touchpoint_name + ', ' +
      field +
      values.threshold + ', ' +
      values.advocate + ', ' + 
      values.friend + ', ' + 
      values.repeat + ', ' +
      values.max;

    return sql + ']';
  },
  extendJSON: function(json1, json2) {
    return $.extend(true, {}, json1, json2);
  },
  filterProperties: function(values) {
    for(var propertyName in values.meta) {
      if(typeof propertyName == 'undefined') {
        values = $.extend(true, {}, values, atJSONGenerator.arrayToProperObject(values.meta));
      } else {
        // Write to clean property as we are going to delete the meta later
        if(typeof values.meta[propertyName][0] == 'undefined') {
          // Extend the original
          values[atJSONGenerator.filterJSONProperty(propertyName)] = $.extend(
            true, 
            {}, 
            values.meta[propertyName], 
            atJSONGenerator.arrayToProperObject(values.meta[propertyName])
          );          
        } else {
          // Discard the original
          values[atJSONGenerator.filterJSONProperty(propertyName)] = atJSONGenerator.arrayToProperObject(values.meta[propertyName]);
        }
      }
    };

    return values;
  },
  // arrayToProperObject
  arrayToProperObject: function (arr) {
    var reformattedMeta = '', evaluated, finalJSON;

    if(arr.length > 0 && typeof arr == 'object') {
      // Go through each object
      arr.forEach(function(obj) {
        if(typeof obj.property !== 'undefined') {
          console.log('defined');
          // Set property without spaces
          reformattedMeta += '"' + atJSONGenerator.filterJSONProperty(obj.property) + '": ';

          if(typeof obj.value !== 'undefined') {
            // Value specified
            reformattedMeta += atJSONGenerator.filterJSONValue(obj.value) + ',';
          } else {
            // No value specified
            reformattedMeta += '"",';
          }
        } else {
          console.log('undefined');
          // Deal with _at level properties
          reformattedMeta += atJSONGenerator.filterJSONValue(
            atJSONGenerator.arrayToProperObject(obj.value)
          ).replace('{','').replace('}','') + ',';
        }
      });

      finalJSON = '{' + reformattedMeta.slice(0, -1) + '}';

      try {
        // creates a JSON object from string
        evaluated = JSON.parse(finalJSON);
      } catch (e) {
        console.warn(e);
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
  // Switching between touch/share point forms
  attachOnChangeEvents: function() {
    jQuery('select#formType').on('change', function() {
      jQuery('form').hide();
      jQuery('#res').html('');
      var val = jQuery(this).val();
      
      if(val != '') {
        // Main form is shared between both sub forms
        if(val == 'sharepoint-generate-json' || val == 'touchpoint-generate-json') {
          jQuery('form#main').show();
        }

        jQuery('form#' + val).show();
      }
    });
  },
  showResult: function(result, prepend, append) {
    if(typeof prepend == 'undefined') {
      prepend = '';
    }

    if(typeof append == 'undefined') {
      append = '';
    }

    if(! result) {
      $('#res').html('<p>I beg your pardon?</p>');
    } else {
      // Display result in the res element
        $('#res').html('<pre>' + prepend + result + append + '</pre>');
        $('#copy-button').attr('data-clipboard-text', prepend + result.replace(/<br \/>/g, '\r\n') + append);
        $('#resultModal').modal('show');
    }
  },
  zeroClipboardCopy: function() {
    var client = new ZeroClipboard( document.getElementById("copy-button") );

    client.on( "ready", function( readyEvent ) {
      client.on( "aftercopy", function( event ) {
        var original = $('button#'+event.target.id).html();
        $('button#'+event.target.id).html("Copied!");
        setTimeout(function(){ $('button#'+event.target.id).html(original); }, 2000);
      } );
    } );
  }
}

atJSONGenerator.attachOnChangeEvents();
atJSONGenerator.zeroClipboardCopy();