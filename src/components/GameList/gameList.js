import React from 'react';
import GameDetails from "../GameDetails/gameDetails"
import "./gameList.css"

const GameList = () => {

    const games = []

    return ( 
            <div className="game-list-container">
                <section className="game-list">
                   
                        <GameDetails title="online game" details="its a mulitplayer game" gameType="/mulitPlayerGame" gameType="/mulitPlayerGame" gameName="onlineGame"/>
                        <GameDetails title="Stick game" details="its a single player game" gameType="/singlePlayerGame/" gamePath="/stickGame" gameName="stick adventure demo"/>
                        <GameDetails title="Cube game" details="its a single player game" gameType="/singlePlayerGame/" gamePath="/cubeGame" gameName="Cube Game Demo"/>
                        
              
                    
                </section>
            </div>
        
      
     );
}
 
export default GameList;