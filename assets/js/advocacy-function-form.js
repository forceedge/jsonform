// select helper_functions.create_advocacy_function('my advocacy function', 'touchpoint_sum', '{my_touchpoint,client_metadata.transaction.amount,100,true,false,true,3}', 56, 17);
// touchpoint_sum  { touchpoint_name, field, threshold, advocate, friend, repeat, max }
// touchpoint_count  { touchpoint_name, threshold, advocate, friend, repeat, max }

// Generate the main form
$('form#advocacy-function-generate-json').jsonForm({
  schema: {          
    "advocacy_function": {
      type: "string",
      title: "Advocacy Functions",
      enum: ["Please select","touchpoint_count", "touchpoint_sum"]
    }
  },
  "form": [
    {
      "key": "advocacy_function",
      "onChange": function(evt) {
        console.log($(evt.target).val());
      }
    },
    {
      "type": "submit",
      "value": "Generate"
    }
  ],
  onSubmit: function (errors, values) {
    console.warn('form submitted');
  }
});