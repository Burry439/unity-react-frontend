import React, {createContext, useState, useEffect} from 'react';
import config from "../config"

export const UserContext = createContext();


const UserContextProvider = (props) => {
  const [user, setUser] = useState("loading")
  const errorStatuses = [404,500,401,403]
  useEffect(() =>{
    console.log("in use effect")
    getUser()
  },[])

  const validateResponse = async (res) =>{
    console.log(res.status)
    if(errorStatuses.includes(res.status)){
      console.log("in if")
      setUser("not logged in")
      return await res.text()
    }else{
      console.log("in else")
      const response = await res.json()
      console.log("validate response else : " + response)
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
    console.log(res)
    return await validateResponse(res)
  }

  return(
        <UserContext.Provider value={{user, login,signout,signup, getUser,setUser}}>
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
