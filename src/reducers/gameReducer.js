export const gameReducer = (state,action) =>{
    switch(action.type){

        case 'START_GAME':
            console.log(action)
            return {playerId : action.data.thisPlayerId, isDuplicate : false, allPlayers : action.data.allPlayers}

        case 'SET_PLAYER_AS_DUPLICATE':
            console.log("SET_PLAYER_AS_DUPLICATE", action)
            return {playerId : action.playerId, isDuplicate : true, allPlayers : []}

        case 'ADD_NEW_PLAYER':
            console.log("ADD_NEW_PLAYER", action)
            return {playerId : state.playerId, isDuplicate : state.isDuplicate, allPlayers : [...state.allPlayers, action.newPlayer]}

        case "REMOVE_PLAYER":
            console.log("REMOVE_PLAYER", action)
            return {playerId : state.playerId, isDuplicate : state.isDuplicate,  allPlayers : state.allPlayers.filter(player => player.id != action.removedPlayerID)}

        case "CLEAR_ALL_PLAYERS":
            console.log("CLEAR_ALL_PLAYERS", action)
            return {thisPlayerId : "", allPlayers: [],isDuplicate : false}

        case "SET_ALL_PLAYERS":
            console.log("set all players", action.allPlayers)
            return {...state, allPlayers : action.allPlayers}

        default:
            return state
    }
}