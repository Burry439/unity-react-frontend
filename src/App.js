import React, { Suspense } from 'react';
import Navbar from "./components/Constants/Navbar/navbar"
import SinglePlayerGame from "./components/Pages/Game/SinglePlayerGame/singlePlayerGame"
import MultiPlayerGame from "./components/Pages/Game/MultiPlayerGame/multiPlayerGame"
import Profile from './components/Pages/Profile/profile';
import Admin from './components/Pages/Admin/admin';
import Home from "./components/Pages/Home/home"
import CModal from './components/Reusable/Modal/Modal';
import GameContextProvider from './contexts/gameContext';
import UserContextProvider from './contexts/userContext';
import ModalContextProvider from './contexts/modalContext';
import config from "./config"
import { BrowserRouter as Router,Route, Switch} from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <Router>
      <div className="App">   
      <Suspense fallback={(<div>Loading</div>)}>
        <ToastProvider autoDismissTimeout={3000}>
          <ModalContextProvider>
          <UserContextProvider>
          <GameContextProvider>
            <Navbar/> 
            <CModal/>
              <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/mulitPlayerGame" exact  component={MultiPlayerGame}/>   
                <Route path="/singlePlayerGame"  component={SinglePlayerGame}/>  
                <Route path="/profile"  exact component={Profile}/>    
                <Route path="/admin"  exact component={Admin}/>   
                <Route component={Home}/>  
              </Switch>
          </GameContextProvider>
          </UserContextProvider>
          </ModalContextProvider>
          </ToastProvider>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
