import React, {useContext, useState} from 'react';
import homeStyles from "./home.module.scss"
import { UserContext } from "../../../contexts/userContext";
import { useHistory } from "react-router-dom";
import {ModalContext} from '../../../contexts/modalContext';
import { motion, useCycle } from "framer-motion"
import Login from "../../Reusable/Login/login"
import Signup from "../../Reusable/Signup/signup"
import { useTranslation } from 'react-i18next';
import Cartridge from './cartridge';

const GameDetails = ({title, details,path, t}) => {
    
    const varients = {
        hidden :{
            opacity : 0,
            x : "-100vw"
          },
          start : {
            opacity : 1,
            x : 0,
            transition:{
              type : "spring",
              delay : 0.5,
              stiffness : 50
            }
          },
          selctedGame : {
            y: '100vh',
            transition : {
              ease: "easeInOut",
              
            }
          },
          exit: {
          x: '-100vh',
          transition : {
            ease: "easeInOut"
          }
        },
       
      }
    

    const [selctedAnimation, cycleSelectedAnimation] = useCycle("start", "selctedGame");

    const {user} = useContext(UserContext)
    const {openModal} = useContext(ModalContext)
    const history = useHistory()
    const toGame = () =>{
        cycleSelectedAnimation()
        setTimeout(() =>{
            history.push({
                pathname : `game/${path}`
            })
        },500) 
    }
  
    return ( 
            <motion.div      
            
            variants={varients}
            initial="hidden"
            animate={selctedAnimation}
            exit="exit">
            <div className={homeStyles["cartridge"]}>
            <Cartridge title={title}/>
            <div className={homeStyles["game-button-container"]}>
                {user._id ? 
                    <p className={`${homeStyles["game-button"]} ${homeStyles["text-medium"]}`} onClick={() => toGame()}>{t("play")}</p> : 
                    <>
                    <p className={`${homeStyles["game-button"]} ${homeStyles["text-medium"]}`} onClick={() => openModal(Login)}>{t("login")}</p> 
                    <p className={`${homeStyles["game-button"]} ${homeStyles["text-medium"]}`} onClick={() => openModal(Signup)}>{t("signup")}</p> 
                   </>
                 } 
                  </div>
                </div>
            </motion.div>
          );
}
 
export default GameDetails;