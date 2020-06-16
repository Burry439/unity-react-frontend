import React from 'react';
import GameList from "./GameList/gameList"
import "./home.css"
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
    return ( 
      <div className="container">
        <div className="top-section">
        <h1>{t('home.title')}</h1>
        </div>
        <div className="game-list-section">
        <GameList/>
        </div>
      </div>
      
     );
}
 
export default Home;