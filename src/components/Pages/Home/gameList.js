import React,{useContext} from 'react';
import GameDetails from "./gameDetails"
import homeStyles from "./home.module.scss"
import { GamesContext } from "../../../contexts/gamesContext";

const GameList = ({t}) => {
     const { games } = useContext(GamesContext)

    return ( 
            <div className={homeStyles["game-list-container"]}>
               {
                    games.games.map((game) =>{
                         return <GameDetails t={t} title={t(`${game.gameName}Title`)} details={t(`${game.gameName}Details`)} path={game.gameName}/>
                    })
               }          
            </div>
     );
}
 
export default GameList;