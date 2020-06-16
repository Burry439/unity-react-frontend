export default {
    config :{
        spinner : true,
        buttonText : "התחברות"
    },
    fields : [
        {
            "label": "שם משתמש",
            "name": "username",
            "placeholder": "הכנס שם משתמש",
            "validation" : {
				"required": "אנא הזן שם משתמש",
			}
        },
        {
            "label": "סיסמה",
	        "placeholder": "הכנס סיסמתך",
			"name" : "password",
            "type" : "password",
            "validation" : {
				"required": "הזן את סיסמתך בבקשה",
			}
        }
    ]
}