import React from 'react';
import GameList from "../GameList/gameList"
import "./home.css"
import {useTranslation} from "react-i18next"

const Home = () => {
  const { t, i18n } = useTranslation();
  const handleClick = (language) =>{
    console.log(t)
    i18n.changeLanguage(language)
  }
    return ( 
      <div className="container">
          <nav style={{width:"100%",padding : '2rem 0', backgroundColor : "grey"}}>
      <button onClick={() => handleClick("en")}>
          English
      </button>
      <button onClick={() => handleClick("he")}>
         עברית
      </button>
  </nav>
        <p>{t("Thanks.1")}</p>
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