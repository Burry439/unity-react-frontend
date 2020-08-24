import React from 'react';
import GameDetails from "./gameDetails"
import "./home.css"

const GameList = ({t}) => {
    const games = []
    return ( 
            <div className="game-list-container">
                 {/* <section className="game-list">  */}
                        <GameDetails t={t} title={t("multiPlayerGameTitle")} details={t("multiPlayerGameDetails")} path="onlineGame"/>
                        <GameDetails t={t} title={t("fallGameTitle")} details={t("fallGameDetails")}  path="fallGame" />
                        <GameDetails t={t} title={t("cubeGameTitle")} details={t("cubeGameDetails")}  path="cubeGame"/>
                 {/* </section>  */}
            </div>
     );
}
 
export default GameList;