export default  {
	"config" : {
		"buttonText" : "Update User",
		"spinner": true
	},
	"fields" : [
		{
			"label": "username",
			"placeholder": "Enter a username",
			"name" : "username",
			"validation" : {
				"required" : "please enter a username",
				"minLength" : {"value" : 5,"message" : "username must have at least 5 characters"}
			}
		},
		{
			"label": "email",
			"placeholder": "Enter a email",
			"name" : "email",
			"type" : "email",
			"validation" : {
				"required" : "please enter a valid email address",
					"pattern": {"message": "invalid email address"}
			}
		},
		{
			"label": "tickets",
			"placeholder": "Enter an amount of tickets",
			"name" : "tickets",
			"type" : "number"
		},
		{
            "type" : "select",
            "name": "role",
            "options" : ["admin" , "user"],
            "label": "User role",
            "required": true
        },
	]
}

