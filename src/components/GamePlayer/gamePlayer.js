import React, {useEffect, useContext} from "react";
import { UserContext } from "../../contexts/userContext";
import { useHistory } from "react-router-dom";
import "./gamePlayer.css"

const GamePlayer = ({game}) => {
  const history = useHistory()
  const {user} = useContext(UserContext)



  const closeGame =  () =>{
    //redirect to home page
    history.push("/home")   
   }

// close game if we sign out
    useEffect(() =>{
      if(!user.id){
        closeGame()
      }
    },[user])
    
    return (
      <div id="unity-body">
        <iframe src={game} height="900px" width="100%"></iframe>
      </div>
    );
};

export default GamePlayer