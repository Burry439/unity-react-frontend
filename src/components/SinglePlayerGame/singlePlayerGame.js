import React, {useEffect,useContext,useState} from 'react';
import { UserContext } from "../../contexts/userContext";
import GamePlayer from '../GamePlayer/gamePlayer';
import config from "../../config"
import io from "socket.io-client";
import { useToasts } from 'react-toast-notifications'

const SinglePlayerGame = (props) => {
    let Socket = null
    const gamePath = props.location.state.gamePath;
    const gameUrl = config.SINGLEPLAYER_GAME_URL
    const gameName = gamePath.replace(/\//g, '');
    const {user, setUserInfo} = useContext(UserContext)
    const [ready, setReady] = useState(false)
    const [isDuplicate, setIsDuplicate] = useState(false)
    const { addToast } = useToasts()

    console.log(gameUrl, gamePath)

    useEffect(() =>{
        Socket = io(gameUrl); 
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
                console.log(challenge)
                user.challenges.push(challenge)
                user.tickets += challenge.reward;
                setUserInfo(user)
                addToast("good job you completed challenge: " + challenge.challengeName, { appearance: 'success' })
            })

            return () =>{
                console.log("in return")
                Socket.close()
            }
        }
    },[])

    if(ready){
        return ( 
            isDuplicate ? <div>Looks Like YOu Have This Open In another Tab</div> : <GamePlayer game={gameUrl + gamePath}/>
         );
    } else {
        return(
            <div>Loading...</div>
        )
    }
 
}
 
export default SinglePlayerGame;