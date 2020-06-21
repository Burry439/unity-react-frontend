import React, {useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../../contexts/userContext";
import "../game.css"
const UnityPlayer = ({game}) => {
    const history = useHistory()
    const {user} = useContext(UserContext)
    useEffect(() =>{
        if(!user.id){
            history.push("/home")
        }
    },[user])
 
    return ( 
        <div id="unity-body">
            <iframe className="unity-player"  src={game} ></iframe>
      </div>
                
        
     );
}
 
export default UnityPlayer;