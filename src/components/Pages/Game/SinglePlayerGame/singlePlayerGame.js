import React, {useEffect,useContext,useState} from 'react';
import { UserContext } from "../../../../contexts/userContext";
import GamePlayer from '../GamePlayer/gamePlayer';
import config from "../../../../config"
import io from "socket.io-client";
import { useToasts } from 'react-toast-notifications'
import { motion } from "framer-motion"
import BouncingLoader from "../../../Reusable/Loaders/bouncingLoader"
const containerVariants = {
    hidden :{
      opacity : 0,
      y : "-100vw"
    },
    visible : {
      opacity : 1,
      y : 0,
      transition:{
        type : "spring",
        delay : 0.5,
        stiffness : 50
      }
    },
    exit: {
      y: '-100vh',
      transition : {
        ease: "easeInOut"
      }
    }
  }


const SinglePlayerGame = (props) => {
    let Socket = null
    const gamePath = props.location.state.gamePath;
    const gameUrl = config.SINGLEPLAYER_GAME_URL
    const gameName = gamePath.replace(/\//g, '');
    const {user, setUserInfo} = useContext(UserContext)
    const [ready, setReady] = useState(false)
    const [isDuplicate, setIsDuplicate] = useState(false)
    const { addToast } = useToasts()

    useEffect(() =>{
        Socket = io(config.SINGLEPLAYER_GAME_URL); 
            if(Socket){
                Socket.on("connect", () => {
                    console.log("connetion")
                    Socket.emit("ReactConnected",{userId : user.id, gameName : gameName})
            });

            Socket.on("gameReady" , () =>{
               setReady(true)
            })

            Socket.on("isDuplicate" , () =>{
                setIsDuplicate(true)
                setReady(true)
             })
 
            Socket.on("challengeCompleted" , (challenge) =>{
                user.completedChallenges.push(challenge)
                user.tickets += challenge.reward;
                setUserInfo(user)
                addToast("good job you completed challenge: " + challenge.challengeName, { appearance: 'success' })
            })

            return () =>{
                Socket.close()
            }
        }
    },[])

    return(
        <motion.div className="container" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
        {ready ? 
            isDuplicate ?
            <div variants={containerVariants} initial="hidden" animate="visible">Looks Like you have this open In another Tab</div>
            :
             <GamePlayer game={gameUrl + gamePath + `/?${user.id}` }/>
            :
            <>
            <div  variants={containerVariants} initial="hidden" animate="visible">Loading...</div>
            <BouncingLoader/>
            </>
        }
        </motion.div>
    )
 
}
 
export default SinglePlayerGame;