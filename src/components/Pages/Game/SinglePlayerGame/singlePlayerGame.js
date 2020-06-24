import React, {useEffect,useContext,useState} from 'react';
import { UserContext } from "../../../../contexts/userContext";
import GamePlayer from '../GamePlayer/gamePlayer';
import config from "../../../../config"
import io from "socket.io-client";
import { useToasts } from 'react-toast-notifications'
import { motion, useAnimation } from "framer-motion"
import loading from "../tenor.gif"


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

const SinglePlayerGame = (props) => {
    const gameControls = useAnimation()
    const loaderControls = useAnimation()
    let Socket = null
    let gamePath = props.location.pathname.match(/.*\/(.*)$/)[1];
    const gameUrl = config.SINGLEPLAYER_GAME_URL
    const {user, setUserInfo} = useContext(UserContext)
    const [isDuplicate, setIsDuplicate] = useState(false)
    const { addToast } = useToasts()
    useEffect(() =>{
      loaderControls.start("visible")
      Socket = io(config.SINGLEPLAYER_GAME_URL); 
      if(Socket){
        Socket.on("connect", () => {
            console.log("connetion")
            Socket.emit("ReactConnected",{userId : user.id, gameName : gamePath})
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
            setUserInfo(user)
            addToast("good job you completed challenge: " + challenge.challengeName, { appearance: 'info' })
        })

      return () =>{
          Socket.close()
      }
  }

  },[])
    return(
        <motion.div className="container" exit={exit}>
        {
            isDuplicate ?
            <motion.div variants={loaderVariants} initial="hidden" animate="visible">Looks Like you have this open In another Tab</motion.div>
            :
            <>
              <motion.div variants={gameVariants} initial="hidden" animate={gameControls} exit="exit">
                  <GamePlayer  game={`${gameUrl}/${gamePath}/?${user.id}`}/>
              </motion.div>

              <motion.div variants={loaderVariants} initial="hidden" animate={loaderControls} exit="exit">
                  <div><img src={loading} className="loading"/></div>
              </motion.div>

            </>
        }
        </motion.div>
    )
 
}
 
export default SinglePlayerGame;