import React, {useEffect,useContext,useState} from 'react';
import { UserContext } from "../../../contexts/userContext";
import GamePlayer from './gamePlayer';
import config from "../../../config"
import io from "socket.io-client";
import { useToasts } from 'react-toast-notifications'
import { motion, useAnimation } from "framer-motion"
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';

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

const duplicateTabVariants = {
  hidden,
  visible : {
    ...visible,
    transition:{
      delay :0.5,
      duration : 0.5,
      stiffness : 50,
      ease : "easeInOut"
    }
  },
}

let Socket = null

const Game = (props) => {
   const { t } = useTranslation("game");
    const gameControls = useAnimation()
    const loaderControls = useAnimation()
    const history = useHistory()
    let gameName = props.location.pathname.match(/.*\/(.*)$/)[1];
    const apiUrl = gameName == "onlineGame" ? config.MULTIPLAYER_GAME_URL : config.SINGLEPLAYER_GAME_URL
    const {user, setUser} = useContext(UserContext)
    const [isDuplicate, setIsDuplicate] = useState(false)
    const [challengeCompleted, setChallengeCompleted] = useState("")

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
          setChallengeCompleted(challenge.challengeName)
        })
      }
    }
    if(user._id){
        return(
          <motion.div className="container" exit={exit}>
          {
              isDuplicate ?
              <motion.div variants={duplicateTabVariants} initial="hidden" animate="visible">{t('duplicateTab')}</motion.div>
              :
              <GamePlayer 
                    gameControls={gameControls}
                    loaderControls={loaderControls}
                    exit={exit}
                    hidden={hidden}
                    visible={visible} 
                    gameName={t(gameName + "Title")}
                    game={`${apiUrl}/${gameName}/?${user._id}`}
                    challengeCompleted={challengeCompleted}
                    /> 
      
          }
          </motion.div>
      )
    }else{
      return <motion.div className="container" exit={exit}></motion.div>
    }
}
 
export default Game;