import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from "../../../contexts/userContext";
import { GamesContext } from "../../../contexts/gamesContext";
import { motion } from "framer-motion"

import challengeListStyles from  "./challengeList.module.scss"


const ChallengeList = ({gameName, t}) => {
    const [variants, setVariants] = useState()
    const smallScreenVariants = {
        hidden :{
            opacity : 0,
             y : 300
        },
        visible : {
            opacity : 1,
            y : 0,
            transition:{
              duration : 2.0,
              type : "spring",
              delay : 1.5,
              stiffness :30
            }
        }
    }
    const largeScreenVariants = {
        hidden :{
         opacity : 0,
          x : -300
        },
        visible : {
         opacity : 1,
          x : 0,
          transition:{
            duration : 3.0,
            type : "spring",
            delay : 1.5,
            stiffness : 50
          }
        },
    }
         
    useEffect(() =>{
        window.innerWidth > 980 ? setVariants(largeScreenVariants) : setVariants(smallScreenVariants)
    },[])


   const [challengeClass, setChallengeClass] = useState("") 
   const {games} = useContext(GamesContext)
   const {userCompletedChallenge} = useContext(UserContext)



    const showChallenges = () =>{
        if(challengeClass == ""){
            setChallengeClass("checkListOpen")
        }else{
            setChallengeClass("")
        }
    }

    if(!games.selectedGame){
    return <></>
    }else{
        return ( 
            <motion.div className={challengeListStyles.checkListContainer} variants={window.innerWidth > 980 ? largeScreenVariants : smallScreenVariants} initial="hidden" animate="visible" >  
                <div onClick={() => showChallenges()} className={challengeListStyles.checkListTitle}>
                    <span>{t("challenges")}</span>
                </div>
                    <div id="check-list" className={ `${challengeListStyles.checkList} ${challengeListStyles[challengeClass]}`}>
                    {  
                    games.selectedGame.challenges.length ? 
    
                    
                        games.selectedGame["challenges"].map(challenge => {
                        
                            return <div key={challenge._id} className={challengeListStyles.challenge}>
                            <input className={challengeListStyles.checkListInput} type="checkbox" disabled={true} checked={userCompletedChallenge(challenge._id)}/>
                            <label data-content={t(gameName + challenge.challengeName)} className={challengeListStyles.checkListLabel}>{t(gameName + challenge.challengeName)} </label>
                            </div>
                        }) :
                        <div className={challengeListStyles.challenge}>
                        <label className={challengeListStyles.checkListLabel}>{t("noChallenges")}</label>
                    </div>
                    }
                </div>
            </motion.div>
         );
    }

}
 
export default ChallengeList;