import React,{useState,useContext} from 'react';
import { UserContext } from "../../contexts/userContext";
import {ModalContext} from '../../contexts/modalContext';

const Login = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const {login} = useContext(UserContext)
    const {closeModal} = useContext(ModalContext)

    const handleSubmit = async (e) =>{
        e.preventDefault()  
        const userData = {
            username : username,
            password : password
        }
        await login(userData)
        closeModal()
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" placeholder="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input type="submit" value="Login"/>
        </form>
     );
}
 
export default Login;