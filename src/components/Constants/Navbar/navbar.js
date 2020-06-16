import React, {useContext,useState, useEffect} from 'react';
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
  const { t, i18n } = useTranslation();

  const {openModal} = useContext(ModalContext)
  const {user, signout} = useContext(UserContext)

    const changeLanguage = (lang) =>{
      i18n.changeLanguage(lang)
    }

    
    return ( 
        <header>
          <Link  className="logo-container" to="/">
          <img className="logo" src={Logo} alt="Logo" />
          </Link>
          <nav>     
            <div className="nav-end-container">
            <div className="language-selector">
              <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {t('navbar.changeLanguage')}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => changeLanguage("en")}>{t('navbar.english')}</Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage("he")}>{t('navbar.hebrew')}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
              <div className="user-links">
              { user.id ? 
                  <ul className="nav-links">
                    <li onClick={() => signout()}><a/>{t('navbar.signout')}</li>
                    <li> <Link to="/profile">{t('navbar.profile')}</Link></li>
                  </ul>
                  :
                  <ul className="nav-links">
                    <li onClick={() => openModal(Signup)}><a/>{t('navbar.signUp')}</li>
                    <li onClick={() => openModal(Login)}><a/>{t('navbar.login')}</li>
                  </ul>
              }
            </div>
          </div>
          </nav>
      </header> 
     );
}
 
export default Navbar;