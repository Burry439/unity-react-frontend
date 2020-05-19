import React from 'react';
import SinglePlayerGame from "./components/SinglePlayerGame/singlePlayerGame"
import MultiPlayerGame from "./components/MultiPlayerGame/multiPlayerGame"

import UnityPlayer from "./components/UnityPlayer/unityPlayer"

import Home from "./components/Home/home"
import Navbar from "./components/Navbar/navbar"
import GameContextProvider from './contexts/gameContext';
import UserContextProvider from './contexts/userContext';
import ModalContextProvider from './contexts/modalContext';
import { BrowserRouter as Router,Route} from "react-router-dom";
import CModal from './components/Modal/Modal';


function App() {
  return (
    <Router>
      <div className="App">
        <ModalContextProvider>
        <UserContextProvider>
        <GameContextProvider>
          <Navbar/> 
          <CModal/>
          <Route path="/" exact component={Home}/>
          <Route path="/home" exact component={Home}/>
          <Route path="/mulitPlayerGame" exact component={MultiPlayerGame}/>   
          <Route path="/singlePlayerGame" exact component={SinglePlayerGame}/>   
        </GameContextProvider>
        </UserContextProvider>
        </ModalContextProvider>
      </div>
    </Router>
  );
}

export default App;
