var mainJSON;

// Generate the main form
$('form#main').jsonForm({
  schema: {          
    "_at": {
      type: "object",
      title: "Advocate_Things",
      properties: {
        key: {
          type: 'string',
          title: 'Client API Key',
          required: true
        },
        userId: {
          type: 'string',
          title: 'Client User ID',
          default: '{ user.id }'            
        },
        username: {
          type: 'string',
          title: 'Client\'s User Username',
           default: '{ user.username }'
        },
        email: {
          type: "string",
          title: 'Email Address',
          default: '{ user.email }'
        },
        name: {
          type: 'string',
          title: 'Client\'s User Name',
           default: '{ user.name }'
        },
        pointType: {
          type: 'string',
          title: 'Point Type',
          enum: [
            'Please select',
            'sharepoint',
            'touchpoint'
          ]
        }
      }
    }
  },
  onSubmit: function (errors, values) {
    if(typeof values.meta !== 'undefined') {
        values.meta = arrayToProperObject(values.meta);

        for(var propertyName in values.meta) {
          if(typeof values.meta[propertyName] !== 'undefined') {
            values.meta[propertyName] = arrayToProperObject(values.meta[propertyName]);
          }
        };
      }

      if (errors) {
        $('#res').html('<p>I beg your pardon?</p>');
      }
      else {
        if (typeof values != 'string') {
          mainJSON = values;
          console.log(mainJSON);
        }
      }
    }
});

jQuery('.form-actions').remove();

function arrayToProperObject(arr) {
  var reformattedMeta = '';

  arr.forEach(function(obj) {
    reformattedMeta += obj.property + ': ' + JSON.stringify(obj.value) + ',';
  });

  return eval('({' + reformattedMeta.slice(0, -1) + '})');
}

// Hide the genrated forms
jQuery('form.generated-json').hide();

// Generate hidden forms
// generate the rest of the form here
$('form#sharepoint-generate-json').jsonForm({
  schema: {          
    "_at": {
      type: "object",
      title: "Sharepoint Data",
      properties: {
        shareChannel: {
          type: "string",
          title: "Share Channel",
          default: '{ shareChannel }'
        },
        sharepointName: {
          type: 'string',
          title: 'Sharepoint Name',
          required: true
        },
        facebookId: {
          type: 'string',
          title: 'Facebook ID',
          default: '{ user.facebookId }'
        },
        twitterId: {
          type: 'string',
          title: 'Twitter ID',
          default: '{ user.twitterId }'
        },
      },
    },
    "meta": {
      type: "array",
      items: {
        type: "object",
        title: "meta",
        properties: {
          "property": {
            type: "string",
            title: "Property {{idx}}"
          },
          "value": {
            type: "array",
            title: "Value {{idx}}",
            items: {
              type: "object",
              properties: {
                "property": {
                  type: "string",
                  title: "Property {{idx}}"
                },
                "value": {
                  type: "string",
                  title: "Value {{idx}}"
                },
              }
            }
          }
        }
      }
    }
  },
  "form": [
    {
      "key": "_at"
    },
    {
      "type": "tabarray",
      "items": [{
        "type": "section",
        "legend": "meta {{idx}}",
        "items": [
          {
            "key": "meta[].property",
            "title": "Property"
          },
          {
            "key": "meta[].value",
            "title": "Value"
          }
        ],
      }],
    },
    {
      "type": "submit",
      "value": "Generate"
    }
  ],
  onSubmit: function(errors, values) {
    generateOutput(errors, values);
  }
});

// Generate touchpoint form here
// generate the rest of the form here
$('form#touchpoint-generate-json').jsonForm({
  schema: {          
    "_at": {
      type: "object",
      title: "Touchpoint Data",
      properties: {
        TouchpointName: {
          type: 'string',
          title: 'Touchpoint Name',
          required: true
        }
      }
    },
    "meta": {
      type: "array",
      items: {
        type: "object",
        title: "meta",
        properties: {
          "property": {
            type: "string",
            title: "Property {{idx}}"
          },
          "value": {
            type: "array",
            title: "Value {{idx}}",
            items: {
              type: "object",
              properties: {
                "property": {
                  type: "string",
                  title: "Property {{idx}}"
                },
                "value": {
                  type: "string",
                  title: "Value {{idx}}"
                },
              }
            }
          }
        }
      }
    }
  },
  "form": [
    {
      "key": "_at"
    },
    {
      "type": "tabarray",
      "items": [{
        "type": "section",
        "legend": "meta {{idx}}",
        "items": [
          {
            "key": "meta[].property",
            "title": "Property"
          },
          {
            "key": "meta[].value",
            "title": "Value"
          }
        ],
      }],
    },
    {
      "type": "submit",
      "value": "Generate"
    }
  ],
  onSubmit: function(errors, values) {
    generateOutput(errors, values);
  }
});

// Generates the JSON for both of the form submissions
function generateOutput (errors, values) {
  jQuery('form#main').submit();

  if(! mainJSON)
    return false;

  if(typeof values.meta !== 'undefined') {
      values.meta = arrayToProperObject(values.meta);

      for(var propertyName in values.meta) {
        if(typeof values.meta[propertyName] !== 'undefined') {
          values.meta[propertyName] = arrayToProperObject(values.meta[propertyName]);
        }
      };
    }

    if (errors) {
      $('#res').html('<p>I beg your pardon?</p>');
    }
    else {
      if (typeof values != 'string') {
        values = $.extend(true, {}, mainJSON, values);
        json = JSON.stringify(values, undefined, 2).replace(/[\r\n]/g, '<br />');
      }

      $('#res').html('<pre>window.advocate_things_data = '+ json +'</pre>');
    }
  };

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