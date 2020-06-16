export default  {

		"config" : {
			"buttonText" : "הירשם",
			"spinner": true
		},
		"fields" : [
	      {
	        "label": "שם משתמש",
	        "placeholder": "הכנס שם משתמש",
			"name" : "username",
			"validation" : {
				"required" : "אנא הכנס שם משתמש",
				"minLength" : {"value" : 5,"message" : "שם המשתמש חייב לכלול לפחות 5 תווים"}
			}
	      },
          {
			"label": "אימייל",
	        "placeholder": `הזן דוא"ל`,
			"name" : "email",
            "type" : "email",
			"validation" : {
				"required" : `אנא הזן כתובת דוא"ל תקנית`,
				 "pattern": {value:/^\S+@\S+\.\S+$/ , "message":`כתובת דוא"ל לא חוקית`}
			}
		 },
		    {
			"label": "סיסמה",
	        "placeholder": "הכנס סיסמא",
			"name" : "password",
            "type" : "password",
			"validation" : {
				"required": "זה נדרש",
				"minLength" : {"value" : 5,"message" : "הסיסמה חייבת לכלול לפחות 5 תווים"}
			}
		 },
		{
			"label": "אשר סיסמה",
	        "placeholder": "אנא אשר את הסיסמה",
			"name" : "password_repeat",
            "type" : "confirmpassword",
			"validation" : {
			"message": "הסיסמאות לא תואמות"
		 }
		}
    ]
	
}

