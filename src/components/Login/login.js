import React,{useState,useContext} from 'react';
import { UserContext } from "../../contexts/userContext";
import {ModalContext} from '../../contexts/modalContext';
import { useForm } from "react-hook-form";

const Login = () => {

    const {login} = useContext(UserContext)
    const {closeModal} = useContext(ModalContext)
    const { handleSubmit,register} = useForm();
    const [showErrorMessage, setShowErrorMessage] = useState({message : "",class : "hide"})
    const onSubmit = async (data) =>{
        const res = await login(data)
        if(res == "success"){
            closeModal();
        }else{
            setShowErrorMessage({
                message : res,
                class: "show"
            })
             setTimeout(() =>{
                setShowErrorMessage(prevState =>({
                    ...prevState,
                    class: "hide"
                }))
             }, 3000)
       }
    }

    return ( 
        <form onSubmit={handleSubmit(onSubmit)}>
        <input  className="form-control" id=""name="username" type="text" placeholder="please enter a username" ref={register()}/>
        <input className="form-control" name="password" type="password" placeholder="please enter a password" ref={register()}/>

        <input  className="form-control btn btn-primary"  type="submit" value="Log In"/>
        <div className="error-message-container">
            <div className={"error-message " +  showErrorMessage.class}>{showErrorMessage.message}</div>
        </div>
    </form>
     );
}
 
export default Login;