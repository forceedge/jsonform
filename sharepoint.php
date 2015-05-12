<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Sharepoint UV Generator</title>
    <link rel="stylesheet" style="text/css" href="deps/opt/bootstrap.css" />
  </head>
  <body>
    <?php require 'menu.php'; ?>
    <div class="container">
      <h1>Sharepoint UV Generator</h1>
      <form></form>
      <div id="res" class="alert"></div>
      <script type="text/javascript" src="deps/jquery.min.js"></script>
      <script type="text/javascript" src="deps/underscore.js"></script>
      <script type="text/javascript" src="deps/opt/jsv.js"></script>
      <script type="text/javascript" src="lib/jsonform.js"></script>
      <script type="text/javascript">
        $('form').jsonForm({
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
                },
                // shareChannel: {
                //   type: "string",
                //   title: "Share Channel",
                //   default: '{ shareChannel }'
                // },
                // sharepointName: {
                //   type: 'string',
                //   title: 'Sharepoint Name',
                //   required: true
                // },
                // facebookId: {
                //   type: 'string',
                //   title: 'Facebook ID',
                //   default: '{ user.facebookId }'
                // },
                // twitterId: {
                //   type: 'string',
                //   title: 'Twitter ID',
                //   default: '{ user.twitterId }'
                // },
                // disable_address_bar_tracking: {
                //   type: 'boolean',
                //   title: "Disable address bar tracking"
                // }
              },
            },
            // "meta": {
            //   type: "array",
            //   items: {
            //     type: "object",
            //     title: "meta",
            //     properties: {
            //       "property": {
            //         type: "string",
            //         title: "Property {{idx}}"
            //       },
            //       "value": {
            //         type: "array",
            //         title: "Value {{idx}}",
            //         items: {
            //           type: "object",
            //           properties: {
            //             "property": {
            //               type: "string",
            //               title: "Property {{idx}}"
            //             },
            //             "value": {
            //               type: "string",
            //               title: "Value {{idx}}"
            //             },
            //           }
            //         }
            //       }
            //     }
            //   }
            // }
          },
          // "form": [
            // {
            //   "key": "_at.pointType",
            //   "titleMap": {
            //     "touchpoint": "Touchpoint",
            //     "sharepoint": "Sharepoint"
            //   }
            // },
            // {
            //   "key": "_at"
            // },
            // {
            //   "type": "tabarray",
            //   "items": [{
            //     "type": "section",
            //     "legend": "meta {{idx}}",
            //     "items": [
            //       {
            //         "key": "meta[].property",
            //         "title": "Property"
            //       },
            //       {
            //         "key": "meta[].value",
            //         "title": "Value"
            //       }
            //     ],
            //   }],
            // },
            // {
            //   "type": "submit",
            //   "value": "Generate"
            // }
          // ],
        });

        function arrayToProperObject(arr) {
          var reformattedMeta = '';

          arr.forEach(function(obj) {
            reformattedMeta += obj.property + ': ' + JSON.stringify(obj.value) + ',';
          });

          return eval('({' + reformattedMeta.slice(0, -1) + '})');
        }

        jQuery('.controls > input').on('change', function(){
          console.log(234);
          jQuery('li.active .draggable.tab').val(jQuery('.controls > input').val());
        });

        jQuery("select[name='_at.pointType']").on('change', function() {
          if($(this).val() == 'sharepoint') {
            // generate the rest of the form here
            $('form').jsonForm({
              schema: {          
                "_at": {
                  type: "object",
                  title: "Advocate_Things",
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
                       json = JSON.stringify(values, undefined, 2).replace(/[\r\n]/g, '<br />');
                  }

                  $('#res').html('<pre>window.advocate_things_data = '+ json +'</pre>');
                }
              }
            });
          } else if($(this).val() === 'touchpoint') {

          }
        });
      </script>
    </div>
  </body>
</html>