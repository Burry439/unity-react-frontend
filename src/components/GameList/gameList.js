import React from 'react';
import GameDetails from "../GameDetails/gameDetails"
import "./gameList.css"

const GameList = () => {

    const games = []

    return ( 
            <div className="game-list-container">
                <section className="game-list">
                   
                        <GameDetails title="online game" details="its a mulitplayer game" gameType="/mulitPlayerGame" gameName="onlineGame"/>
                        <GameDetails title="Stick game" details="its a single player game" gameType="/singlePlayerGame" gameName="stick adventure demo"/>
                        
              
                    
                </section>
            </div>
        
      
     );
}
 
export default GameList;