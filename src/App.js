import React, { Suspense } from 'react';
import Navbar from "./components/Constants/Navbar/navbar"
import Game from "./components/Pages/Game/game"
import Profile from './components/Pages/Profile/profile';
import Admin from './components/Pages/Admin/admin';
import Home from "./components/Pages/Home/home"
import CModal from './components/Reusable/Modal/Modal';
import UserContextProvider from './contexts/userContext';
import ModalContextProvider from './contexts/modalContext';
import { Route, Switch, useLocation } from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications'
import { AnimatePresence } from "framer-motion"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const location = useLocation()

  return (
        <div className="App">   
            <ToastProvider>
            <ModalContextProvider>
            <UserContextProvider>
                <Navbar/> 
                <CModal/>
                <AnimatePresence exitBeforeEnter>
                    <Switch location={location} key={location.key}>
                        <Route path="/" exact component={Home}/>
                        <Route path="/profile" component={Profile}/>  
                        <Route path="/game"  component={Game}/>  
                        <Route path="/admin"  exact component={Admin}/>   
                        <Route component={Home}/>  
                    </Switch>
                </AnimatePresence>
          </UserContextProvider>
          </ModalContextProvider>
          </ToastProvider>
      </div>
  );
}

export default App;
