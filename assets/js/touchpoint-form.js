// Generate touchpoint form here
// generate the rest of the form here
$('form#touchpoint-generate-json').jsonForm({
  schema: {          
    "_at": {
      type: "object",
      title: "Touchpoint Data",
      properties: {
        touchpointName: {
          type: 'string',
          title: 'Touchpoint Name *',
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
    atJSONGenerator.generateOutput(errors, values);
  }
});