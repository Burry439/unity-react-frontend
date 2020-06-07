export const gameReducer = (state,action) =>{
    switch(action.type){

        case 'START_GAME':
            return {playerId : action.data.thisPlayerId, isDuplicate : false, allPlayers : action.data.allPlayers}

        case 'SET_PLAYER_AS_DUPLICATE':
            return {playerId : action.playerId, isDuplicate : true, allPlayers : []}

        case 'ADD_NEW_PLAYER':
            return {playerId : state.playerId, isDuplicate : state.isDuplicate, allPlayers : [...state.allPlayers, action.newPlayer]}

        case "REMOVE_PLAYER":
            return {playerId : state.playerId, isDuplicate : state.isDuplicate,  allPlayers : state.allPlayers.filter(player => player.id != action.removedPlayerID)}

        case "CLEAR_ALL_PLAYERS":
            return {thisPlayerId : "", allPlayers: [],isDuplicate : false}

        case "SET_ALL_PLAYERS":
            return {...state, allPlayers : action.allPlayers}

        default:
            return state
    }
}