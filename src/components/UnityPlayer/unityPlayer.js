import React, {useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

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
            <iframe src={game} height="900px" width="100%"></iframe>
      </div>
                
        
     );
}
 
export default UnityPlayer;