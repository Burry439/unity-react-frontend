import React, {createContext, useState, useEffect} from 'react';
import config from "../config"

export const GamesContext = createContext();


const GamesContextProvider = (props) => {
  const [games, setGames] = useState({
    selectedGame : undefined,
    games :[]
  })
  const errorStatuses = [404,500,401,403]

  useEffect(() =>{
    getGames()
  },[])

  const validateResponse = async (res) =>{
    if(errorStatuses.includes(res.status)){
      return await res.text()
    }else{
      const response = await res.json()
      setGames(prevState =>({
        ...prevState,
        games: response
    }))
      return("success")
    }
  }
  
  const setSelectedGame = (gameName) =>{
    console.log("in here")
    const game = games.games.find(game => game.gameName == gameName)
    setGames(prevState =>({
      ...prevState,
      selectedGame : game
  }))
  }

  const getGames = async () =>{
      const res =  await fetch(`${config.API_URL}/game/getGames`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          'language' : "en"
        },
    });
    return await validateResponse(res)
  }

  const getGame = (gameName) =>{
    const game = games.games.find(game => game.gameName == gameName)
    console.log(game)
    return game
  }

  return(
        <GamesContext.Provider value={{games,getGame,setSelectedGame}}>
            {props.children}
        </GamesContext.Provider>
  )
}

export default GamesContextProvider;



