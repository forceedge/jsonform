var mainJSON;
// Generate the main form
$('form#main').jsonForm({
  schema: {          
    "_at": {
      type: "object",
      title: "Advocate Things",
      properties: {
        userId: {
          type: 'string',
          title: 'Customer User ID',
          default: '{ user.id }'            
        },
        username: {
          type: 'string',
          title: 'Customer Username',
           default: '{ user.username }'
        },
        email: {
          type: "string",
          title: 'Customer Email Address',
          default: '{ user.email }'
        },
        name: {
          type: 'string',
          title: 'Customer Name',
          default: '{ user.name }'
        },
        facebookId: {
          type: 'string',
          title: 'Customer Facebook ID',
          default: '{ user.facebookId }'
        },
        twitterId: {
          type: 'string',
          title: 'Customer Twitter ID',
          default: '{ user.twitterId }'
        }
      }
    }
  },
  onSubmit: function (errors, values) {
    if(typeof values.meta !== 'undefined') {
        values.meta = atJSONGenerator.arrayToProperObject(values.meta);

        for(var propertyName in values.meta) {
          if(typeof values.meta[propertyName] !== 'undefined') {
            values.meta[propertyName] = atJSONGenerator.arrayToProperObject(values.meta[propertyName]);
          }
        };
      }

      if (errors) {
        $('#res').html('<p>I beg your pardon?</p>');
      }
      else {
        if (typeof values != 'string') {
          mainJSON = values;
        }
      }
    }
});