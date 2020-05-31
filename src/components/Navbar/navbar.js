import React, {useContext,useState, useEffect} from 'react';
import Login from "../Login/login"
import Signup from "../Signup/signup"
import { Link } from 'react-router-dom'
import "./navbar.css"
import Logo from "./logo.png";
import {ModalContext} from '../../contexts/modalContext';
import {UserContext} from '../../contexts/userContext';


const Navbar = () => {
  const {openModal} = useContext(ModalContext)
  const {user, signout} = useContext(UserContext)


    return ( 
        <header>
          <Link  className="logo-container" to="/">
          <img className="logo" src={Logo} alt="Logo" />
          </Link>
          <nav>     
              { user.id ? 
                  <ul className="nav-links">
                    <li onClick={() => signout()}><a/>Signout</li>
                    <li> <Link to="/profile">Profile</Link></li>
                  </ul>
                  :
                  <ul className="nav-links">
                    <li onClick={() => openModal(Signup)}><a/>Sign Up</li>
                    <li onClick={() => openModal(Login)}><a/>Login</li>
                  </ul>
              }
            
          </nav>
          {/* <a className="cta"><button>Contact</button></a> */}
      </header> 
     );
}
 
export default Navbar;