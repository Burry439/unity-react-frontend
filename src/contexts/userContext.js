import React, {createContext, useState} from 'react';
import { userReducer } from '../reducers/userReducer';
import config from "../config"

export const UserContext = createContext();


const initialState = JSON.parse(localStorage.getItem("jwt")) || 
{
  id : null,
  username : "",
  accessToken : "",
  challenges: null,
  tickets : null
};

const UserContextProvider = (props) => {
    const [user, setUser] = useState(initialState)
    
  const setUserInfo = (user) => {
    //remove last local storage
    localStorage.removeItem("jwt")
    localStorage.setItem("jwt", JSON.stringify(user))
    setUser(user)
  }

  const clearUserInfo = () =>{
    localStorage.removeItem("jwt")
    setUser({
      id : null,
      username : "",
      accessToken : "",
      challenges: null,
      tickets : null
    })
  }

    const signout = () =>{
      clearUserInfo()
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
            accessToken : response.accessToken,
            challenges: response.user.completedChallenges,
            tickets : response.user.tickets
          }
          setUserInfo(user)

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
        console.log(response)
        const user = {
          id : response.user._id,
          username : response.user.username,
          accessToken : response.accessToken,
          challenges: response.user.completedChallenges,
          tickets : response.user.tickets
        }
        setUserInfo(user)
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



    return(
        <UserContext.Provider value={{user, login,signout,signup, setUserInfo}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;