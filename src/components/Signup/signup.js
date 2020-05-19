import React,{useState,useContext} from 'react';
import { UserContext } from "../../contexts/userContext";
import {ModalContext} from '../../contexts/modalContext';

const Signup = () => {
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {signup, test} = useContext(UserContext)
    const {closeModal} = useContext(ModalContext)

    const handleSubmit = async (e) =>{
        e.preventDefault()  
        const userData = {
            username : username,
            password : password,
            email : email
        }
        await signup(userData)
        closeModal();
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="email" placeholder="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>

            <input type="password" placeholder="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input type="submit" value="Sign up"/>
        </form>
     );
}
 
export default Signup;