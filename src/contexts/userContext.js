import React, {createContext, useState, useEffect} from 'react';
import config from "../config"

export const UserContext = createContext();


const UserContextProvider = (props) => {
  const [user, setUser] = useState("loading")
  const errorStatuses = [404,500,401,403]
  useEffect(() =>{
    getUser()
  },[])

  const validateResponse = async (res) =>{
    if(errorStatuses.includes(res.status)){
      setUser("not logged in")
      return await res.text()
    }else{
      const response = await res.json()
      setUser(response)
      return("success")
    }
  }
  
  const signout = async () =>{
    const res =  await fetch(`${config.API_URL}/user/logout`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'language' : "en"
      },
    });
    setUser("not logged in")
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

  const getUser = async () =>{
      const res =  await fetch(`${config.API_URL}/user/getUser`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          'language' : "en"
        },
    });
    return await validateResponse(res)
  }

  const userCompletedChallenge = (challengeId) =>{
    return user.completedChallenges.filter((challenge) =>{
      return challenge._id == challengeId
    }).length
  }

  return(
        <UserContext.Provider value={{user, login,signout,signup, getUser,setUser,userCompletedChallenge}}>
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
