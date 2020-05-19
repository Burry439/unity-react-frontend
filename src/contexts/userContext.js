import React, {createContext, useState} from 'react';
import { userReducer } from '../reducers/userReducer';
import config from "../config"

export const UserContext = createContext();


const initialState = JSON.parse(localStorage.getItem("jwt")) || 
{
  id : null,
  username : "",
  accessToken : ""
};

const UserContextProvider = (props) => {
    const [user, setUser] = useState(initialState)
    
    const signout = () =>{
      localStorage.removeItem("jwt")
        setUser({
          id : null,
          username : "",
          accessToken : ""
        })
    }

    const login  = async (userData) => {
        const res =  await fetch(`${config.API_URL}/users/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData) // body data type must match "Content-Type" header
          });
          const response = await res.json()
          // find better place to put this
          const user = {
            id : response.user._id,
            username : response.user.username,
            accessToken : response.accessToken
          }
          localStorage.setItem("jwt", JSON.stringify(user))
          setUser(user)
    }

    const test = async () =>{
      const res =  await fetch(`${config.API_URL}/users/test`, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Authorization' : `Bearer ${user.accessToken}` ,
            'Content-Type': 'application/json'
          },
        
        });
        const response = await res.json()
        console.log(response)
  }


    const signup = async (userData) =>{
        const res =  await fetch(`${config.API_URL}/users/signup`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData) // body data type must match "Content-Type" header
          });
          const response = await res.json()
          const user = {
            id : response.user._id,
            username : response.user.username,
            accessToken : response.accessToken
          }
          // find better place to put this
          localStorage.setItem("jwt", JSON.stringify(user))
          setUser(user)
    }

    return(
        <UserContext.Provider value={{user, login,signout,signup, test}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;