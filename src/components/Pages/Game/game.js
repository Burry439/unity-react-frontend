import React, {useEffect,useContext,useState} from 'react';
import { UserContext } from "../../../contexts/userContext";
import GameIframe from './gameIframe';
import config from "../../../config"
import io from "socket.io-client";
import { useToasts } from 'react-toast-notifications'
import { motion, useAnimation } from "framer-motion"
import { useHistory } from "react-router-dom";

import loading from "./tenor.gif"

const exit = {
  y: '-100vh',
  transition : {
    ease: "easeInOut"
  }
}

const hidden = {
  display : "none",
  opacity : 0,
}

const visible = {
  display : "block",
  opacity : 1
}

const gameVariants = {
  hidden,
  visible,
}

const loaderVariants = {
  hidden,
  visible : {
    ...visible,
    transition:{
      delay : 0.5,
      duration : 1.5,
      stiffness : 50,
      ease : "easeInOut"
    }
  },
}
let Socket = null

const Game = (props) => {
    const gameControls = useAnimation()
    const loaderControls = useAnimation()
    const history = useHistory()
    let gameName = props.location.pathname.match(/.*\/(.*)$/)[1];
    const apiUrl = gameName == "onlineGame" ? config.MULTIPLAYER_GAME_URL : config.SINGLEPLAYER_GAME_URL
    const {user, setUser} = useContext(UserContext)
    const [isDuplicate, setIsDuplicate] = useState(false)
    const { addToast } = useToasts()

    useEffect(() =>{
      if(user._id){
        startSocketConnection()
      }
      if(user == "not logged in"){
        history.push("/home") 
      }
    },[user])

     useEffect(() => {
       return () => {
         console.log("in return : " + Socket)
         if(Socket != null){
           Socket.disconnect()
         }
       }
     }, [])
    const startSocketConnection = () =>{
      loaderControls.start("visible")
      Socket = io(apiUrl); 
      if(Socket){
        Socket.on("connect", () => {
            console.log("connetion")
            Socket.emit("ReactConnected",{userId : user._id, gameName : gameName})

      });

        Socket.on("gameReady" , () =>{
            loaderControls.start("hidden")
            gameControls.start("visible")
        })

        Socket.on("isDuplicate" , () =>{
            setIsDuplicate(true)
          })

        Socket.on("challengeCompleted" , (challenge) =>{
            user.completedChallenges.push(challenge)
            user.tickets += challenge.reward;
            setUser(user)
            addToast("good job you completed challenge: " + challenge.challengeName, { appearance: 'info' })
        })
    }
  }
    if(user._id){
        return(
          <motion.div className="container" exit={exit}>
          {
              isDuplicate ?
              <motion.div variants={loaderVariants} initial="hidden" animate="visible">Looks Like you have this open In another Tab</motion.div>
              :
              <>
                <motion.div variants={gameVariants} initial="hidden" animate={gameControls} exit="exit">
                  <GameIframe game={`${apiUrl}/${gameName}/?${user._id}`}/> 
                </motion.div>

                <motion.div variants={loaderVariants} initial="hidden" animate={loaderControls} exit="exit">
                    <div><img src={loading} className="loading"/></div>
                </motion.div>

              </>
          }
          </motion.div>
      )
    }else{
      return <motion.div className="container" exit={exit}></motion.div>
    }
}
 
export default Game;