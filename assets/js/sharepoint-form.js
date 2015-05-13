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
          title: 'Sharepoint Name *',
          required: true
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
            type: "string"
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
  "params": {
    'fieldHtmlClass': 'this-is-the-field-html-class'
  },
  "form": [
    {
      "key": "_at"
    },
    {
      "type": "tabarray",
      "items": [{
        "type": "section",
        "legend": "{{ value }}",
        "items": [
          {
            "key": "meta[].property",
            "title": "Property",
            "valueInLegend": true
          },
          {
            "key": "meta[].value",
            "title": "Value",
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
    generateOutput(errors, values);
  }
});