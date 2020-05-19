import React from 'react';
import GamePlayer from '../GamePlayer/gamePlayer';

const SinglePlayerGame = ({location}) => {
    return ( 
        <GamePlayer game={location.state}/>
     );
}
 
export default SinglePlayerGame;