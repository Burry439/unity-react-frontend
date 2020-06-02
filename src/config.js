const dev = {
    API_URL : "http://localhost:8080",
    MULTIPLAYER_GAME_URL : "http://localhost:7000",
    SINGLEPLAYER_GAME_URL : "http://localhost:8000"
  };
  
  const prod = {
    API_URL : "https://unity-react-games.herokuapp.com",
    MULTIPLAYER_GAME_URL : "https://online-game-iframe.herokuapp.com",
    SINGLEPLAYER_GAME_URL : "https://single-player-games-iframe.herokuapp.com"
  };
  
  const config = process.env.REACT_APP_STAGE === 'dev'
    ? prod
    : dev;
  
  export default {
    ...config
  };