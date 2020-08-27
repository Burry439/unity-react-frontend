import React from 'react';
import loading from "../../../images/tenor.gif"
import { motion } from "framer-motion"

import "./game.css"
import ArcadeMachine from './arcadeMachine';

const GamePlayer = ({game, gameControls, loaderControls,exit, hidden, visible,challengeCompleted, gameName}) => {

    const arcadeVariants = {
        hidden :{
          opacity : 0,
          y : "-100vh"
        },
        visible : {
          ...visible,
          y : 0,
          transition:{
            type : "spring",
            delay : 0.5,
            stiffness : 50
          }
        },
        exit: exit
      }
         
      const loaderVariants = {
        hidden,
        visible : {
          ...visible,
          transition: {
            delay :2.0,
            duration : 3.0,
            stiffness : 50,
            ease : "easeInOut"
          }
        },
      }

      const gameVariants = {
        hidden,
        visible,
      }
   
    return ( 
        <div className="game-player">
        <motion.div variants={arcadeVariants} initial="hidden" animate="visible">
          <ArcadeMachine challengeCompleted={challengeCompleted} gameName={gameName}/> 
        </motion.div>
       
        <motion.div variants={gameVariants} className="game-player-container" initial="hidden" animate={gameControls} exit="exit">
            <iframe className="game-player-screen"  src={game} referrerPolicy="origin"></iframe>
        </motion.div>
  
        <motion.div className="game-player-container" variants={loaderVariants} initial="hidden" animate={loaderControls} exit="exit">
            <img className="game-player-screen" src={loading} />
        </motion.div>
      </div>
     );
}
 
export default GamePlayer;