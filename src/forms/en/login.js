export default {
    "config" :{
        "spinner" : true,
        "buttonText" : "Login"
    },
    "fields" : [
        {
            "label": "Username",
            "name": "username",
            "placeholder": "Enter your username",
            "validation" : {
                "required": "please enter your username",
            }
        },
        {
            "label": "Password",
            "placeholder": "Enter your password",
            "name" : "password",
            "type" : "password",
            "validation" : {
                "required": "please enter your password",
            }
        }
    ]
}