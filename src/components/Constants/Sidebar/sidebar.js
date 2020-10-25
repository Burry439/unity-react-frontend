import React, {useContext} from 'react';
import Arrows from "./svgs/arrows.js";
import sidebarStyles from  "./sidebar.module.scss"
import SidebarItem from "./sidebarItem"

import Login from "../../Reusable/Login/login"
import Signup from "../../Reusable/Signup/signup"
import {useCookies} from "react-cookie"
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import {UserContext} from '../../../contexts/userContext';
import {ModalContext} from '../../../contexts/modalContext';


const SideBar = ({theme,setTheme,direction}) => {
    const [cookies, setCookie] = useCookies();
    const { t, i18n } = useTranslation("constant");
    const {user, signout} = useContext(UserContext)
    const {openModal} = useContext(ModalContext)

    const changeLanguage = (lang) =>{
        setCookie("language", lang)
        i18n.changeLanguage(lang)
      }
  
    const toggleTheme = () => {
        if (theme.lighting === 'light') {
          setCookie("theme", "dark")
          setTheme({
            icon : "fa fa-sun-o",
            lighting: 'dark'
          });
        } else {
          setCookie("theme", "light")
          setTheme({
            icon : "fa fa-moon-o",
            lighting: 'light'
          });
        }
      }

    return ( 
      
        <nav className={`${sidebarStyles["navbar"]} ${sidebarStyles[theme.lighting]}`}>
        <ul className={sidebarStyles["navbarNav"]}>

            <li className={sidebarStyles["logo"]}>
            <Link to="/" className={sidebarStyles["navLink"]}>
                <span className={`${sidebarStyles["linkText"]} ${sidebarStyles["logoText"]}`}>The Site</span>
            < Arrows direction={direction}/>
            </Link>
            </li>
            {
              user._id ?
              <>
              <SidebarItem itemType="link" click="/profile" icon="fa fa-user-circle" text={t('profile')}/>
              {
                user.role == "admin" ? <SidebarItem itemType="link" click="/admin" icon="fa fa-id-badge" text={t('admin')}/> : <></>
              }
              <SidebarItem itemType="button" click={signout} icon="fa fa-sign-out" text={t('signout')}/>
             
              </>
              :
              <>
               <SidebarItem itemType="button" click={() => openModal(Signup)} icon="fa fa-user-plus" text={t('signup')}/>
               <SidebarItem itemType="button" click={() => openModal(Login)} icon="fa fa-sign-in" text={t('login')}/>
              </>
            }

            <li className={sidebarStyles["navItem"]}>
            <a className={sidebarStyles["navLink"]}>
            <i className="fa fa-language" aria-hidden="true"></i>
          <span className={sidebarStyles["linkText"]}>{t('changeLanguage')}</span>
            </a>
            <div className={sidebarStyles["languages"]}>
                  <span className={sidebarStyles["language"]} onClick={() => changeLanguage("en")}>{t('english')}</span>
                  <span className={sidebarStyles["language"]} onClick={() => changeLanguage("he")}>{t('hebrew')}</span>
              </div>
            </li>

            <SidebarItem itemType="button" click={toggleTheme} icon={theme.icon} text={t('changeTheme')}/>
        </ul>
        </nav>
    );
}
 
export default SideBar;