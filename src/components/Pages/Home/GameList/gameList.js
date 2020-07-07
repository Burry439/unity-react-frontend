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
                   
                        <GameDetails title={t("home.games.multiPlayerGame.title")} details={t("home.games.multiPlayerGame.details")} path="onlineGame"/>
                        <GameDetails title={t("home.games.fallGame.title")} details={t("home.games.fallGame.details")}  path="fallGame" />
                        <GameDetails title={t("home.games.cubeGame.title")} details={t("home.games.cubeGame.details")}  path="cubeGame"/>
                </section>
            </div>
     );
}
 
export default GameList;