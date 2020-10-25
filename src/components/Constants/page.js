import React, {useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from "framer-motion"
import { Route, Switch, useLocation } from "react-router-dom";
import Navbar from "./Navbar/navbar"
import Game from "../Pages/Game/game"
import Profile from '../Pages/Profile/profile';
import Admin from '../Pages/Admin/admin';
import Home from "../Pages/Home/home"
import CModal from '../Reusable/Modal/Modal';
import {useCookies} from "react-cookie"
import SideBar from './Sidebar/sidebar';

const Page = () => {
    const [cookies, setCookie] = useCookies();
    const { i18n } = useTranslation();
    const location = useLocation()
    useEffect(() =>{
        const language = cookies.language ? cookies.language : "en"
        i18n.changeLanguage(language)
    },[])
    const currentTheme = cookies.theme == "light" ? {
        icon : "fa fa-moon-o",
        lighting: 'light'
    } :
    {
        icon : "fa fa-sun-o",
        lighting: 'dark'
    }
    const [theme, setTheme] = useState(currentTheme);
    const direction = i18n.language == "en" ? "ltr" : "rtl"
    
    return ( 
        // <ThemeProvider theme={theme.lighting === 'light' ? lightTheme : darkTheme}>
        // <GlobalStyles />  
        <div className={`${direction} rootContainer ${theme.lighting}`}>
            <SideBar theme={theme} setTheme={setTheme} direction={direction}/>
        {/* <Navbar theme={theme} setTheme={setTheme}/>  */}
       
        <div className="page">
            <CModal/>
            <AnimatePresence exitBeforeEnter>
                <Switch  location={location} key={location.key}>
                    <Route path="/" exact component={Home}/>
                    <Route path="/profile" component={Profile}/>  
                    <Route path="/game"  component={Game}/>  
                    <Route path="/admin"  exact component={Admin}/>   
                    <Route component={Home}/>  
                </Switch>
            </AnimatePresence>
            </div>
        </div>
        // </ThemeProvider>
     );
}
 
export default Page;