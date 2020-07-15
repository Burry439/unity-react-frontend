import React, {useContext} from 'react';
import "./gameDetails.css"
import { UserContext } from "../../../../contexts/userContext";
import { useHistory } from "react-router-dom";
import {ModalContext} from '../../../../contexts/modalContext';
import Login from "../../../Reusable/Login/login";
import Signup from "../../../Reusable/Signup/signup";
import { useTranslation } from 'react-i18next';

const GameDetails = ({title, details,path, t}) => {
    
    const {user} = useContext(UserContext)
    const {openModal} = useContext(ModalContext)
    const history = useHistory()
    const toGame = () =>{
        history.push({
            pathname : `game/${path}`
        })   
    }

    return ( 
        <div className="game-details">
            <div className="game-details-image-container">
                <img src="https://images.unsplash.com/photo-1589289959525-b5b685332c7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80" alt="none"/>
            </div>

            <div className="game-details-content">
                <p className="game-details-title text-medium">
                   {title}
                </p>
                <div className="game-details-info">
                    <p className="text-medium">{details}</p>
                {user.id ? 
                   <p className="game-details-play text-medium" onClick={() => toGame()}>{t("play")}</p> : 
                   <>
                   <p className="game-details-play text-medium" onClick={() => openModal(Login)}>{t("login")}</p> 
                   <p className="game-details-play text-medium" onClick={() => openModal(Signup)}>{t("signup")}</p> 
                   </>
                }
                </div>
            </div>

        </div>
     );
}
 
export default GameDetails;