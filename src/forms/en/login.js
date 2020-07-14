export default {
    "config" :{
        "spinner" : true,
        "buttonText" : "Login"
    },
    "fields" : [
        {
            "label": "username",
            "name": "username",
            "placeholder": "Enter your username",
            "validation" : {
                "required": "please enter your username",
            }
        },
        {
            "label": "password",
            "placeholder": "Enter your password",
            "name" : "password",
            "type" : "password",
            "validation" : {
                "required": "please enter your password",
            }
        }
    ]
}