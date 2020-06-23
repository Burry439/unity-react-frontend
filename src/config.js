const dev = {
    API_URL : "http://localhost:8080",
    MULTIPLAYER_GAME_URL : "http://localhost:7000",
    SINGLEPLAYER_GAME_URL : "http://localhost:8080/game"
  };
  
  const prod = {
    API_URL : "https://unity-react-games.herokuapp.com",
    MULTIPLAYER_GAME_URL : "https://online-game-iframe.herokuapp.com",
    SINGLEPLAYER_GAME_URL : "https://unity-react-games.herokuapp.com/game"
  };
  
  const config = process.env.NODE_ENV  === 'production'
    ? prod
    : dev;
  
  export default {
    ...config
  };