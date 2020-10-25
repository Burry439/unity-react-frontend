import React from 'react';
import loading from "../../../images/tenor.gif"
import { motion } from "framer-motion"
import gameStyles from  "./game.module.scss"
import ArcadeMachine from './arcadeMachine';

const GamePlayer = ({game, t,gameControls, loaderControls,exit, hidden, visible,arcadeText}) => {

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
        <div className={gameStyles.gamePlayer}>
        <motion.div  variants={arcadeVariants} initial="hidden" animate="visible" >
          <ArcadeMachine t={t} arcadeText={arcadeText} /> 
        </motion.div>
       
        <motion.div variants={gameVariants} className={gameStyles.gameScreenContainer} initial="hidden" animate={gameControls} exit="exit">
            <iframe className={gameStyles.gameScreen}  src={game} referrerPolicy="origin"></iframe>
        </motion.div>
  
        <motion.div className={gameStyles.gameScreenContainer} variants={loaderVariants} initial="hidden" animate={loaderControls} exit="exit">
            <img className={gameStyles.gameScreen} src={loading} />
        </motion.div>
      </div>
     );
}
 
export default GamePlayer;