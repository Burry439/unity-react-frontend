const dev = {
    API_URL : "http://localhost:8080",
    MULTIPLAYER_GAME_URL : "https://online-game-iframe.herokuapp.com",
    SINGLEPLAYER_GAME_URL : "https://single-player-games-iframe.herokuapp.com"
  };
  
  const prod = {
    API_URL : "https://unity-react-games.herokuapp.com",
    MULTIPLAYER_GAME_URL : "https://online-game-iframe.herokuapp.com",
    SINGLEPLAYER_GAME_URL : "https://single-player-games-iframe.herokuapp.com"
  };
  
  const config = process.env.NODE_ENV  === 'production'
    ? prod
    : dev;
  
  export default {
    ...config
  };