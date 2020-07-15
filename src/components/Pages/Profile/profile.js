import React, {useContext,useEffect} from 'react';
import { UserContext } from "../../../contexts/userContext";
import { useHistory } from "react-router-dom";
import "./profile.css"
import { motion } from "framer-motion"

const containerVariants = {
    hidden :{
      opacity : 0,
      x : "100vw"
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
      x: '100vh',
      transition : {
        ease: "easeInOut"
      }
    }
  }

const Profile = () => {
    const {user} = useContext(UserContext)
    const history = useHistory()

    useEffect(() =>{
        if(!user.id){
            history.push("/home")
        }
    },[user])

    if(user.id){
        return ( 
            <motion.div 
            className="container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            >
                <h1>Welcome {user.username}</h1>
                <div>
                    <h2>Completed Challenges</h2>
                    <ul>
                        {user.completedChallenges.map((completedChallenge) => {
                           return <li className="challenges" key={completedChallenge._id}>challenge name: {completedChallenge.challengeName}</li>
                        })}
                    </ul>
                    <h3>Total Tickets: {user.tickets}</h3>
                </div>
            </motion.div>
            );
    }else{
        return <motion.div exit></motion.div>
    }

}
 
export default Profile;