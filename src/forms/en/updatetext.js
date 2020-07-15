 export default {
	"config" : {
		"buttonText" : "Update Text",
		"spinner": true
	},
	"fields" : [
		{
			"type" : "select",
			"options" : ["admin" , "game", "home", "profile","constant"],
			"label": "Page",
			"name": "pageName",
			"required": true
		},
		{
			"type" : "select",
			"options" : ["en" , "he"],
			"label": "language",
			"name": "language",
			"required": true
		},
		{
			"label": "key",
			"name" : "key",
			"placeholder": "Enter the key to find this text",
			"type" : "input",
			"required": true
		},
		{
			"label": "value",
			"name" : "value",
			"placeholder": "Enter the value for the text",
			"type" : "input",
			"required": true
		},
	]
}

