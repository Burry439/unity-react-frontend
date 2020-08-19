import React, {useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../contexts/userContext";
import "./game.css"
import config from '../../../config';
const GameIframe = ({game}) => {
    // const history = useHistory()
    // const {user} = useContext(UserContext)


 
    return ( 
        <div id="game-body">
            { 
            process.env.NODE_ENV == "production" ? 
                <iframe className="game-player"  src={game} referrerPolicy="origin"></iframe>
                :
                <div className="game-player">Game Player</div>
            }
      </div>
                
        
     );
}
 
export default GameIframe;