import React, {useContext,useEffect} from 'react';
import { UserContext } from "../../contexts/userContext";
import { useHistory } from "react-router-dom";
import "./profile.css"
const Profile = () => {
    const {user} = useContext(UserContext)
    const history = useHistory()

    useEffect(() =>{
        if(!user.id){
            console.log("no user")
            history.push("/home")
        }
    },[user])

    if(user.id){
        return ( 
            <div>
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
            </div>
            );
    }else{
        return <div></div>
    }

}
 
export default Profile;