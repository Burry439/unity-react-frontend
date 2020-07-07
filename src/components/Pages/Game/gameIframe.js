import React, {useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../contexts/userContext";
import "./game.css"
const GameIframe = ({game}) => {
    const history = useHistory()
    const {user} = useContext(UserContext)
    useEffect(() =>{
        if(!user.id){
            history.push("/home")
        }
    },[user])
 
    return ( 
        <div id="game-body">
            <iframe className="game-player"  src={game} ></iframe>
      </div>
                
        
     );
}
 
export default GameIframe;