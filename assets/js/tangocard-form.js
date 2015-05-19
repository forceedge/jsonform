// id        | 3
// created   | 2015-04-20 09:58:21.540331
// updated   | 2015-04-20 09:58:21.540331
// client_id | 1
// name      | costa_starbucks_get_voucher_25gbp
// method    | POST
// url       | https://sandbox.tangocard.com/raas/v1/orders
// headers   | 
// {
// 	"Content-Type": "application/json; charset=utf-8", 
// 	"Authorization": "Basic RGlnaXRhbEFuaW1hbFRlc3Q6NkxXRGUzbDRnUTRIUGNGR3FmaGNDeVVpQ2o4MjRXSWZLUmo0RjZJTndpR2JpSVJiTlBlaklUSTBobw=="
// }
// body      | 
// {
// 	"customer": "MVPPP",
// 	"account_identifier": "Demoo",
// 	"campaign": "",
// 	"recipient": {"name": "#DA{advocate.name}", "email": "#DA{advocate.email}"},
// 	"sku": "SBUX-E-500-STD",
// 	"reward_from": "",
// 	"reward_subject": "",
// 	"reward_message": "",
// 	"send_reward": false
// }

// Generate hidden forms
$('form#tangocard-generate-json').jsonForm({
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
        },
        Authorization: {
          type: "string",
          title: "API Key *",
          required: true
        }
      }
    },
    "body": {
      type: "object",
      title: "Body",
      properties: {
      	customer: {
      		type: 'string',
      		title: 'Customer',
      		required: true,
      		default: 'MVPPP'
      	},
      	account_identifier: {
      		type: 'string',
      		title: 'Account Identifier',
      		required: true,
      		default: 'Demoo'
      	},
      	campaign: {
      		type: 'string',
      		title: 'Campaign',
      		default: ' '
      	},
      	recipient: {
      		type: 'string',
      		title: 'Recipient',
      		required: true,
      		default: '{"name": "#DA{advocate.name}", "email": "#DA{advocate.email}"}'
      	},
      	sku: {
      		type: 'string',
      		title: 'SKU Code',
      		required: true,
      		default: 'SBUX-E-500-STD'
      	},
      	reward_from: {
      		type: 'string',
      		title: 'Reward From',
      		default: ' '
      	},
      	reward_subject: {
      		type: 'string',
      		title: 'Reward Subject',
      		default: ' '
      	},
      	reward_message: {
      		type: 'string',
      		title: 'Reward Message',
      		default: ' '
      	},
      	send_reward: {
      		type: 'boolean',
      		title: 'Send Reward'
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
    	// Amend returned data
    	result.headers.Authorization = 'Basic ' + result.headers.Authorization
    	// Stringify the result
    	result = atJSONGenerator.generateJSONString(result);
    	// Display the result
    	atJSONGenerator.showResult(result);
    }
  }
});