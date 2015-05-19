// select helper_functions.create_advocacy_function('my advocacy function', 'touchpoint_sum', '{my_touchpoint,client_metadata.transaction.amount,100,true,false,true,3}', 56, 17);
// touchpoint_sum  { touchpoint_name, field, threshold, advocate, friend, repeat, max }
// touchpoint_count  { touchpoint_name, threshold, advocate, friend, repeat, max }

// This variable will hold the main forms data, which is shared between two other forms
var advocacy_function_main;

// Generate the main form
$('form#advocacy-function-generate-json').jsonForm({
  schema: {          
    "advocacy_function": {
      type: "object",
      title: "Advocacy Functions",
      properties: {
        name: {
          type: "string",
          title: "Advocacy Function Name",
          required: true
        },
        advocacy_routine_id: {
          type: "number",
          title: "Advocacy Routine ID",
          required: true
        },
        action_template_id: {
          type: "number",
          title: "Action Template ID"
        },
        type: {
          type: "string",
          enum: ["Please Select","touchpoint_count", "touchpoint_sum"],
          title: "Advocacy Function Type"
        }
      }
    }
  },
  "form": [
    {
      "key": "advocacy_function",
      "onChange": function(evt) {
        if(jQuery(evt.target).is('select')) {
          jQuery('form.subform').hide();
          jQuery('#res').html('');

          value = $(evt.target).val();

          if(value !== 'Please Select') {
            jQuery('form#'+value).show();
          }
        }
      }
    }
  ],
  onSubmit: function (errors, values) {
    if(errors === false) {
      advocacy_function_main = values;
    }
  }
});

// Touchpoint count form
$('form#touchpoint_count').jsonForm({
  schema: {
    "touchpoint_count": {
      type: "object",
      title: "Touchpoint Count",
      properties: {
        touchpoint_name: {
          type: "string",
          title: "Touchpoint Name",
          required: true
        },
        threshold: {
          type: "number",
          title: "Threshold",
          required: true
        },
        advocate: {
          type: "boolean",
          title: "Advocate"
        },
        friend: {
          type: "boolean",
          title: "Friend"
        },
        repeat: {
          type: "boolean",
          title: "Repeat"
        },
        max: {
          type: "number",
          title: "Max",
          required: true,
          default: 0
        }
      }
    }
  },
  "form": [
    {
      "key": "touchpoint_count"
    },
    {
      "type": "submit",
      "value": "Generate"
    }
  ],
  onSubmit: function (errors, values) {
    // Prevalidate
    jQuery('form#advocacy-function-generate-json').submit();

    if(typeof advocacy_function_main == 'undefined') {
      return false;
    }
    
    // Create the sql for the args
    sql = atJSONGenerator.generateInvalidJSONStringForSQL(values.touchpoint_count);

    // Extend the object just because it makes the result consistent to use
    values = atJSONGenerator.extendJSON(advocacy_function_main, values);

    // Create the string, not flexible but will get the job done
    sql = "'" + values.advocacy_function.name + "', " + "'" + values.advocacy_function.type + "', '" +
      sql + "', " + values.advocacy_function.advocacy_routine_id + ", ";

    if(typeof values.advocacy_function.action_template_id !== 'undefined') {
      sql += values.advocacy_function.action_template_id;
    } else {
      sql += "null";
    }

    atJSONGenerator.showResult(sql, "select helper_functions.create_advocacy_function(", ");");
  }
});

// Touchpoint sum form
$('form#touchpoint_sum').jsonForm({
  schema: {
    "touchpoint_sum": {
      type: "object",
      title: "Touchpoint Sum",
      properties: {
        touchpoint_name: {
          type: "string",
          title: "Touchpoint Name",
          required: true
        },
        field: {
          type: "string",
          title: "Field",
          required: true
        },
        threshold: {
          type: "number",
          title: "Threshold",
          required: true
        },
        advocate: {
          type: "boolean",
          title: "Advocate"
        },
        friend: {
          type: "boolean",
          title: "Friend"
        },
        repeat: {
          type: "boolean",
          title: "Repeat"
        },
        max: {
          type: "number",
          title: "Max",
          required: true,
          default: 0
        }
      }
    }
  },
  "form": [
    {
      "key": "touchpoint_sum"
    },
    {
      "type": "submit",
      "value": "Generate"
    }
  ],
  onSubmit: function (errors, values) {
    // Prevalidate
    jQuery('form#advocacy-function-generate-json').submit();

    // If values are not set for the main form, reject as that must be because of an error
    if(typeof advocacy_function_main == 'undefined') {
      return false;
    }

    // Create the sql for the args
    sql = atJSONGenerator.generateInvalidJSONStringForSQL(values.touchpoint_sum);

    // Extend the object just because it makes the result consistent to use
    values = atJSONGenerator.extendJSON(advocacy_function_main, values);

    // Create the string, not flexible but will get the job done
    sql = "'" + values.advocacy_function.name + "', " + "'" + values.advocacy_function.type + "', '" +
      sql + "', " + values.advocacy_function.advocacy_routine_id + ", ";

    if(typeof values.advocacy_function.action_template_id !== 'undefined') {
      sql += values.advocacy_function.action_template_id;
    } else {
      sql += "null";
    }

    atJSONGenerator.showResult(sql, "select helper_functions.create_advocacy_function(", ");");
  }
});