import React, {useContext,useEffect} from 'react';
import Login from "../../Reusable/Login/login"
import Signup from "../../Reusable/Signup/signup"
import { Link } from 'react-router-dom'
import "./navbar.css"
import Logo from "./logo.png";
import {ModalContext} from '../../../contexts/modalContext';
import {UserContext} from '../../../contexts/userContext';
import { useTranslation } from 'react-i18next';
import {Dropdown} from 'react-bootstrap'

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
              <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {t('changeLanguage')}
              </Dropdown.Toggle>

              <Dropdown.Menu >
                <Dropdown.Item onClick={() => changeLanguage("en")}>{t('english')}</Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage("he")}>{t('hebrew')}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
              <div className="user-links">
              { user._id ? 
                  <ul className="nav-links">
                    <li onClick={() => signout()}><a/>{t('signout')}</li>
                    <li> <Link to="/profile">{t('profile')}</Link></li>
                    {
                      user.role == "admin" ? <li> <Link to="/admin">{t('admin')}</Link></li> : <></>
                    }
                  </ul>
                  :
                  <ul className="nav-links">
                    <li onClick={() => openModal(Signup)}><a/>{t('signup')}</li>
                    <li onClick={() => openModal(Login)}><a/>{t('login')}</li>
                  </ul>
              }
            </div>
          </div>
          </nav>
      </header> 
     );
}
 
export default Navbar;