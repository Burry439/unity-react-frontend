import React, {useContext,useEffect} from 'react';
import Login from "../../Reusable/Login/login"
import Signup from "../../Reusable/Signup/signup"
import { Link } from 'react-router-dom'
import navStyles from "./navbar.module.scss"
import Logo from "./logo.png";
import {ModalContext} from '../../../contexts/modalContext';
import {UserContext} from '../../../contexts/userContext';
import { useTranslation } from 'react-i18next';
import {useCookies} from "react-cookie"

const Navbar = ({theme,setTheme}) => {
  const [cookies, setCookie] = useCookies();
  const { t, i18n } = useTranslation("constant");
  const {openModal} = useContext(ModalContext)
  const {user, signout} = useContext(UserContext)

  const changeLanguage = (lang) =>{
      setCookie("language", lang)
      i18n.changeLanguage(lang)
    }

    const direction = i18n.language == "en" ? "left" : "right"
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
        <header className={navStyles['nav-header']}>
          <div className={navStyles["logo-container"]}>
          <Link   to="/">
          <img className={navStyles["logo"]} src={Logo} alt="Logo" />
          </Link>
          </div>
          <nav>     
            <div className={navStyles["nav-end-container"]}>


           <div className={navStyles["language-selector"]}>
              <i className="fa fa-language" aria-hidden="true"></i>
              <div className={navStyles["languages"]}>
                  <span className={navStyles["language"]} onClick={() => changeLanguage("en")}>{t('english')}</span>
                  <span className={navStyles["language"]} onClick={() => changeLanguage("he")}>{t('hebrew')}</span>
              </div>
            </div> 

            <div onClick={() => toggleTheme()} className={navStyles.themeButton}>
              <i className={`${theme.icon} ${navStyles.themeIcon} ${navStyles[direction]}`}  aria-hidden="true"></i>
              <span>{t('changeTheme')}</span>
            </div>

            <div>
              { user._id ? 
                  <div className={navStyles["nav-buttons"]}>
                    <span onClick={() => signout()}>{t('signout')}</span>
                    <span><Link className={navStyles["nav-button"]} to="/profile">{t('profile')}</Link></span>
                    {
                      user.role == "admin" ? <span> <Link className={navStyles["nav-button"]} to="/admin"></Link>{t('admin')}</span> : <></>
                    }
                  </div>
                  :
                  <div className={navStyles["nav-buttons"]}>
                    <span onClick={() => openModal(Signup)}>{t('signup')}</span>
                    <span  onClick={() => openModal(Login)}>{t('login')}</span>
                  </div>
              }
              </div>
          </div>
        </nav>
      </header> 
     );
}
 
export default Navbar;