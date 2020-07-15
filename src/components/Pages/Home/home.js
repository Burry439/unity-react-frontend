import React from 'react';
import GameList from "./GameList/gameList"
import "./home.css"
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion"

const containerVariants = {
  hidden :{
    opacity : 0,
    x : "-100vw"
  },
  visible : {
    opacity : 1,
    x : 0,
    transition:{
      type : "spring",
      delay : 0.5,
      stiffness : 50
    }
  },
  exit: {
    x: '-100vh',
    transition : {
      ease: "easeInOut"
    }
  }
}

const Home = () => {
  const { t } = useTranslation("home");
    return ( 
      <motion.div className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="top-section">
        <h1 className="title">{t('title')}</h1>
        </div>
        <div className="game-list-section">
        <GameList t={t}/>
        </div>
      </motion.div>
      
     );
}
 
export default Home;