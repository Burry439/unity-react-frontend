import React, {createContext, useState} from 'react';
import config from "../config"

export const UserContext = createContext();

const initialState =  
{
  id : null,
  username : "",
  accessToken : "",
  completedChallenges: null,
  tickets : null
};

const UserContextProvider = (props) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("jwt")) || initialState)
    
  const setUserInfo = (userData) => {
    //fix _id problem
    const id = userData._id == undefined ? userData.id : userData._id
    const user = {
      id : id,
      username : userData.username,
      accessToken : userData.accessToken,
      completedChallenges: userData.completedChallenges,
      tickets : userData.tickets
    }
    localStorage.removeItem("jwt")
    localStorage.setItem("jwt", JSON.stringify(user))
    setUser(user)
  }

  const signout = () =>{
      localStorage.removeItem("jwt")
      setUser(initialState)
    }

  const validateResponse = async (res) =>{
    if(res.status === (404 || 500)){
      return await res.text()
    }else{
      const response = await res.json()
      setUserInfo(response.user)
      return("success")
    }
  }

    const login  = async (userData,language) => {
        const res =  await fetch(`${config.API_URL}/user/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              'language' : language
            },
            body: JSON.stringify(userData) // body data type must match "Content-Type" header
          });
          return await validateResponse(res)
    }

    const signup = async (userData) =>{
      const res =  await fetch(`${config.API_URL}/user/signup`, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData) // body data type must match "Content-Type" header
        });
        return await validateResponse(res)
  }





    return(
        <UserContext.Provider value={{user, login,signout,signup, setUserInfo}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;




// example of access token for later

  //   const test = async () =>{
  //     const res =  await fetch(`${config.API_URL}/users/test`, {
  //         method: 'GET', // *GET, POST, PUT, DELETE, etc.
  //         headers: {
  //           'Authorization' : `Bearer ${user.accessToken}` ,
  //           'Content-Type': 'application/json'
  //         },
        
  //       });
  //       const response = await res.json()
  //       console.log(response)
  // }
