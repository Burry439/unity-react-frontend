export default  {
	"config" : {
		"buttonText" : "Create User",
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
				"pattern": {value:/^\S+@\S+\.\S+$/ , "message": "invalid email address"}
			}
		},
		{
			"label": "tickets",
	        "placeholder": "Enter an amount of tickets",
			"name" : "tickets",
            "type" : "number"
		},
		{
			"label": "password",
	        "placeholder": "Enter a password",
			"name" : "password",
            "type" : "password",
			"validation" : {
				"required": "this is required",
				"minLength" : {"value" : 5,"message" : "Password must have at least 5 characters"}
			}
		},
		{
			"label": "Confirm password",
	        "placeholder": "please confirm pasword",
			"name" : "password_repeat",
            "type" : "confirmpassword",
			"validation" : {
				"message": "The passwords do not match"
		 	}
		}
    ]
}

