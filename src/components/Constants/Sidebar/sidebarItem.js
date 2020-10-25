import React from 'react';
import sidebarStyles from  "./sidebar.module.scss"
import { Link } from 'react-router-dom'

const sidebarItem = ({itemType = "button",click, icon,text}) => {
    if(itemType == "link"){
        return(
            <li className={sidebarStyles["navItem"]}>
            <Link to={click} className={sidebarStyles["navLink"]}>
            <i className={icon} aria-hidden="true"></i>
            <span className={sidebarStyles["linkText"]}>{text}</span>
            </Link>
          </li> 
        )
    }else{
        return ( 
            <li className={sidebarStyles["navItem"]}>
            <a className={sidebarStyles["navLink"]} onClick={() => click()}>
                <i className={icon}  aria-hidden="true"></i>
                <span className={sidebarStyles["linkText"]}>{text}</span>
            </a>
            </li>
         );
    }
 
}
 
export default sidebarItem;