import React, {useEffect, useContext} from "react";
import { UserContext } from "../../contexts/userContext";
import { GameContext } from "../../contexts/gameContext";
import io from "socket.io-client";
import "./multiPlayerGame.css"
import UnityPlayer from "../UnityPlayer/unityPlayer";

const Game = () => {

  const {user} = useContext(UserContext)
  const {game,gameDispatch} = useContext(GameContext)
  let Socket = null

    useEffect(() =>{
      console.log("in use effect")
      Socket = io("http://localhost:7000");  
      if(Socket){
        Socket.on("connect", () => {
          console.log("connetion")
        });
       
        Socket.emit("addReactUser", user);

        // gets me all players 
        Socket.on("reactFirstSpawn", (data) =>{  
          console.log("reactFirstSpawn")
           gameDispatch({type : "START_GAME", data})
        })
        
        Socket.on("duplicatePlayer", (playerId) =>{
          console.log("duplicatePlayer")
           gameDispatch({type : "SET_PLAYER_AS_DUPLICATE", playerId})
        })

        //add new player
        Socket.on("reactSpawn", (newPlayer) =>{
          console.log("reactSpawn")

          //if we are signed in then show us the new player
             gameDispatch({type : "ADD_NEW_PLAYER", newPlayer})
        })

        //if a player diconnects or signs out
        Socket.on("disconnectFromReact", (removedPlayer)=>{
          console.log("in disconnectFromReact",removedPlayer)
           //remove the dsiconnected player
           // getting called twice for some reason 
           if(!game.isDuplicate){
              gameDispatch({type : "REMOVE_PLAYER", removedPlayerID: removedPlayer})
           }
           
       })
        return  () =>{
          console.log("in return")
           gameDispatch({type : "CLEAR_ALL_PLAYERS"})
          Socket.close()
        }
      } 
    },[])
    
    return (
      game.isDuplicate ?
            <div>Looks like you have this opened in anoyher tab try closing and refreshing the page</div>                             
          :     
          <UnityPlayer game="http://localhost:7000/"/>              
    );
};

export default Game