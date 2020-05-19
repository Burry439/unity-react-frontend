import React from 'react';
import GameList from "../GameList/gameList"
import "./home.css"

const Home = () => {

    return ( 
      <div className="container">
        <div className="top-section">
        < h1>Select a Game</h1>
        </div>
        <div className="game-list-section">
        <GameList/>
        </div>
      </div>
      
     );
}
 
export default Home;