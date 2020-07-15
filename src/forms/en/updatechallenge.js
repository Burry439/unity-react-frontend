export default {
    "config" : {
        "buttonText" : "Create Challenge",
        "spinner": true
    },
    "fields" : [
        {
            "label": "challengeName",
            "name" : "challengeName",
            "placeholder": "Enter the challengeName",
            "required": true
        },
        {
            "type" : "select",
            "name": "gameName",
            "entity" : "Game",
            "options" : ["cubeGame" , "stickGame", "multiPlayerGame"],
            "label": "gameName",
            "required": true
        },
        {
            "label": "reward",
            "name" : "reward",
            "placeholder": "Enter the amount of tickets for this reward",
            "type" : "number",
            "required": true
        },
        {
            "name": "active",
            "label": "active",
            "type" : "checkbox"
        }
    ]
}

