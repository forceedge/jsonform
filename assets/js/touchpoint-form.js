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
          title: 'Touchpoint Name'
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