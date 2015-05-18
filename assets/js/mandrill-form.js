// id        | 4
// created   | 2015-04-20 10:00:46.729804
// updated   | 2015-04-20 11:51:28.343231
// client_id | 1
// name      | costa_starbucks_email_voucher_25gbp
// method    | POST
// url       | https://mandrillapp.com/api/1.0/messages/send-template.json
// headers   | 
// {
//   "Content-Type": "application/json; charset=utf-8"
// }
// body      | 
// {
//     "key": "WAY-2sqOVGH7devg34EiCQ",
//     "template_name": "ZaidTestTemplate",
//     "template_content": [
//         {
//             "name": "advocate_email",
//             "content": "Advocate email was #DA{advocate.email}"
//         },
//         {
//             "name": "advocate_cool_stuff",
//             "content": "URL: #DA{upstream.order.reward.redemption_url}, Token: #DA{upstream.order.reward.token}, Number: #DA{upstream.order.reward.number}"
//         }
//     ],
//     "message": {
//         "from_email": "notcosta@notcosta.com",
//         "from_name": "Not-Costa",
//         "to": [
//             {
//                 "email": "#DA{advocate.email}",
//                 "name": "#DA{advocate.name}",
//                 "type": "to"
//             }
//         ],
//         "headers": {
//             "Reply-To": "notcosta@notcosta.com"
//         }
//     }
// }

var mainJSON;
// Generate the main form
$('form#mandrill-generate-json').jsonForm({
  schema: {
    "headers": {
      type: "object",
      title: "Headers",
      properties: {
        "Content-Type": {
          type: 'string',
          title: 'Content-Type *',
          required: true,
          default: 'application/json; charset=utf-8'
        }
      }
    },
    "body": {
      type: "object",
      title: "Body",
      properties: {
        key: {
          type: 'string',
          title: 'Key',
          required: true,
          default: 'WAY-2sqOVGH7devg34EiCQ'
        },
        template_name: {
          type: 'string',
          title: 'Template Name',
          required: true,
          default: 'ZaidTestTemplate'
        },
        // Convert to array
        template_content: {
          type: 'tabarray',
          title: 'Template Content',
          legend: "{{ value }}",
          items: {
            type: "object",
            properties: {
              name: {
                type: 'string',
                title: 'Name'
              },
              content: {
                type: 'string',
                title: 'Content'
              }
            }
          }
        },
        // Convert to array
        message: {
          type: 'object',
          title: 'Message',
          properties: {
            from_email: {
              type: 'string',
              title: 'From Email'
            },
            from_name: {
              type: 'string',
              title: 'From Name'
            },
            to: {
              type: 'tabarray',
              title: 'To',
              items: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    title: 'Email',
                    default: '#DA{advocate.email}'
                  },
                  name: {
                    type: 'string',
                    title: 'Name',
                    default: '#DA{advocate.name}'
                  },
                  type: {
                    type: 'string',
                    title: 'Type',
                    default: 'To'
                  }
                }
              }
            },
            headers: {
              type: 'object',
              properties: {
                "Reply-To": {
                  type: 'string',
                  title: 'Reply To'
                }
              }
            }
          }
        }
      }
    }
  },
  "form": [
    {
      "key": "headers"
    },
    {
      "key": "body"
    },
    {
      "type": "submit",
      "value": "Generate"
    }
  ],
  onSubmit: function(errors, values) {
    var result;

    // Get the JSON back
    if(result = atJSONGenerator.generateOutput(errors, values)) {
      // Stringify the result
      result = atJSONGenerator.generateJSONString(result);
      // Display the result
      atJSONGenerator.showResult(result);
    }
  }
});