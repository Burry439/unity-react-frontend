import React, {createContext, useReducer} from 'react';
import { gameReducer } from '../reducers/gameReducer';


export const GameContext = createContext();

const GameContextProvider = (props) => {
    const [game, gameDispatch] = useReducer(gameReducer,{ thisPlayerId : "", isDuplicate : false, allPlayers: []})
    
    return(
        <GameContext.Provider value={{game, gameDispatch }}>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameContextProvider;