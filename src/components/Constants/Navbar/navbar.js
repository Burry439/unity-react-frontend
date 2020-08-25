import React, {useContext,useEffect} from 'react';
import Login from "../../Reusable/Login/login"
import Signup from "../../Reusable/Signup/signup"
import { Link } from 'react-router-dom'
import "./navbar.css"
import Logo from "./logo.png";
import {ModalContext} from '../../../contexts/modalContext';
import {UserContext} from '../../../contexts/userContext';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation("constant");
  const {openModal} = useContext(ModalContext)
  const {user, signout} = useContext(UserContext)

  const changeLanguage = (lang) =>{
      i18n.changeLanguage(lang)
    }
    const rtl = {
      direction : "rtl"
    }
  
    const ltr = {
        direction : "ltr"
    }
  
    const direction = i18n.language == "en" ? ltr : rtl
   
    return ( 
        <header style={direction}>
          <div className="logo-container">
          <Link   to="/">
          <img className="logo" src={Logo} alt="Logo" />
          </Link>
          </div>
          <nav>     
            <div className="nav-end-container">

           <div className="language-selector">
            <i className="fa fa-language icon-large"  style={{fontSize : "30px"}} aria-hidden="true"></i>
            <div className="languages">
                <span className="language" onClick={() => changeLanguage("en")}>{t('english')}</span>
                <span className="language" onClick={() => changeLanguage("he")}>{t('hebrew')}</span>
            </div>
           </div>        

              <div className="user-links">
              { user._id ? 
                  <div className="nav-buttons">
                    <span onClick={() => signout()}>{t('signout')}</span>
                    <span><Link className="nav-button" to="/profile">{t('profile')}</Link></span>
                    {
                      user.role == "admin" ? <span> <Link className="nav-button" to="/admin">{t('admin')}</Link></span> : <></>
                    }
                  </div>
                  :
                  <div className="nav-buttons">
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