import React, {useEffect,useContext,useState} from 'react';
import { UserContext } from "../../../contexts/userContext";
import { GamesContext } from "../../../contexts/gamesContext";
import challengeCompleteSoundEffect from "../../../sounds/challengeComplete.mp3"
import GamePlayer from './gamePlayer';
import config from "../../../config"
import io from "socket.io-client";
import { motion, useAnimation } from "framer-motion"
import { useHistory } from "react-router-dom";
import {useTranslation } from 'react-i18next';
import ChallengeList from './challengeList';
import gameStyles from  "./game.module.scss"

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

const setArcadeFontSize = (text) =>{
  let fontSize = "longestText"
    switch (true){
      case text.length <= 10:
        fontSize = "shortestText"
        break
      case text.length == 15 || text.length == 16:
        fontSize = "mediumText"
        break
    }
  return fontSize
}

const Game = (props) => {
  let gameName = props.location.pathname.match(/.*\/(.*)$/)[1];
  const audio = new Audio(challengeCompleteSoundEffect)
  const { t,i18n } = useTranslation("game");
  const gameControls = useAnimation()
  const loaderControls = useAnimation()
  const history = useHistory() 
  const apiUrl = gameName == "onlineGame" ? config.MULTIPLAYER_GAME_URL : config.SINGLEPLAYER_GAME_URL
  const {user, setUser} = useContext(UserContext)
  const {setSelectedGame,games} = useContext(GamesContext)

  const [isDuplicate, setIsDuplicate] = useState(false)
  const [arcadeText, setArcadeText] = useState({
    text : t(gameName + "Title"),
    fontSize : setArcadeFontSize(t(gameName + "Title"))
  })

  i18n.on("languageChanged", () =>{
    setArcadeText(({
      text : t(gameName + "Title"),
      fontSize : setArcadeFontSize(t(gameName + "Title"))
    }))
  })

  useEffect(() =>{    
    if(user._id){
      startSocketConnection()
    }
    if(user == "not logged in"){
      history.push("/home") 
    }
  },[user])


  useEffect(()=>{
      if(!games.selectedGame){
        setArcadeFontSize(prevState =>({
          ...prevState,
          fontSize : setArcadeFontSize(t("notFoundTitle"))
      }))
      }
  },[games])

  useEffect(() => {
    setSelectedGame(gameName)
    return () => {
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
        audio.play()
        setArcadeText({
          text : `${t("challengeCompleted")} \n ${t(gameName + challenge.challengeName)}`,
          fontSize : setArcadeFontSize(`Challenge Completed ${challenge.challengeName}`)
        })
        setTimeout(() =>{
          setArcadeText({
            text : t(gameName + "Title"),
            fontSize : setArcadeFontSize( t(gameName + "Title"))
          })
        },5000)
      })
    }
  }
  if(user._id){
      return(
        <motion.div className={gameStyles.gamePlayerContainer} exit={exit}>
        {
            isDuplicate ?
            <motion.div variants={duplicateTabVariants} initial="hidden" animate="visible">{t('duplicateTab')}</motion.div>
            :
            <>
            
            {<ChallengeList gameName={gameName} t={t}/>}
            <GamePlayer 
                  gameControls={gameControls}
                  loaderControls={loaderControls}
                  exit={exit}
                  hidden={hidden}
                  visible={visible} 
                  game={`${apiUrl}/${gameName}/?${user._id}`}
                  arcadeText={arcadeText}
                  t={t}
                  /> 
                  
            </>
        }
        </motion.div>
    )
  }else{
    return <motion.div exit={exit}></motion.div>
  }
}
 
export default Game;