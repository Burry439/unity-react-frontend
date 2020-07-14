 export default {
	"config" : {
		"buttonText" : "Create Challenge",
		"spinner": true
	},
	"fields" : [
		{
			"label": "challenge name",
			"name" : "challengeName",
			"placeholder": "Enter the challengeName",
			"required": true
		},
		{
			"type" : "select",
			"entity" : "Game",
			"displayname" : "name",
			"options" : ["cubeGame" , "stickGame", "multiPlayerGame", "fallGame"],
			"label": "game name",
			"name": "gameName",
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

