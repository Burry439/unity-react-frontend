import React from 'react';
import GameDetails from "../GameDetails/gameDetails"
import "./gameList.css"
import { useTranslation } from 'react-i18next';


const GameList = () => {

    const games = []
    const { t } = useTranslation();
    return ( 
            <div className="game-list-container">
                <section className="game-list">
                   
                        <GameDetails title={t("home.games.multiPlayerGame.title")} details={t("home.games.multiPlayerGame.details")} gameType="/mulitPlayerGame" gameType="/mulitPlayerGame" gameName="onlineGame"/>
                        <GameDetails title={t("home.games.stickGame.title")} details={t("home.games.cubeGame.details")} gameType="singlePlayerGame" path="stickGame" />
                        <GameDetails title={t("home.games.cubeGame.title")} details={t("home.games.cubeGame.details")} gameType="singlePlayerGame" path="cubeGame"/>
                </section>
            </div>
     );
}
 
export default GameList;