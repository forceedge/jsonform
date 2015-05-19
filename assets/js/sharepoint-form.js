// Generate hidden forms
// generate the rest of the form here
$('form#sharepoint-generate-json').jsonForm({
  schema: {          
    "_at": {
      type: "object",
      title: "Sharepoint Data",
      properties: {
        sharepointName: {
          type: 'string',
          title: 'Sharepoint Name'
        },
        shareChannel: {
          type: "string",
          title: "Share Channel (Optional)",
          default: '{ shareChannel }'
        },
        shareTokenAlias: {
          type: "string",
          title: "Share Token Alias (Optional)"
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
            title: "property"
          },
          "value": {
            type: "array",
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
  "params": {
    'fieldHtmlClass': 'this-is-the-field-html-class'
  },
  "form": [
    {
      "key": "_at",
    },
    {
      "type": "tabarray",
      "title": 'Meta Data',
      "items": [{
        "type": "section",
        "legend": "{{ value }}",
        "items": [
          {
            "key": "meta[].property",
            "title": "Category",
            "valueInLegend": true,
            "htmlClass": "categoryInput"
          },
          {
            "key": "meta[].value",
            "title": "Properties",
            "htmlClass": "wrapup"
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
    var result;

    jQuery('form#main').submit();

    if(! mainJSON)
      return false;

    // Get the JSON back
    if(result = atJSONGenerator.generateOutput(errors, values)) {
      // Stringify the result
      result = atJSONGenerator.generateJSONString(result);
      // Display the result
      atJSONGenerator.showResult(result, 'window.advocate_things_data = ');
    }
  }
});