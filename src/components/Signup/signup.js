import React,{useState,useContext, useRef} from 'react';
import { UserContext } from "../../contexts/userContext";
import {ModalContext} from '../../contexts/modalContext';
import { useForm } from "react-hook-form";

import "./signup.css"

const Signup = () => {
    const {signup} = useContext(UserContext)
    const {closeModal} = useContext(ModalContext)
    const { handleSubmit, register, errors,watch } = useForm();
    const [showErrorMessage, setShowErrorMessage] = useState({
        message : "",
        class : "hide"
    })
    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = async (values) =>{
        const res = await signup(values)
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
            <input  className="form-control" id=""name="username" type="text" placeholder="please enter a username" 
                    ref={register({
                        required: "please enter a username",
                        minLength : {value : 5,message : "username must have at least 5 characters"}, 
                    })}
                   />
            {errors.username && <div className="invalid-input-message">{errors.username.message}</div>}

            <input className="form-control" name="email" type="email" placeholder="please enter a email" 
                    ref={register({
                        required: "please enter a valid email address",
                        pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,message: "invalid email address"}
                    })}
                   />            
            {errors.email && <div className="invalid-input-message">{errors.email.message}</div>}

            <input className="form-control" name="password" type="password" placeholder="please enter a password" 
                    ref={register({
                        required: "this is required",
                        minLength : {value : 5,message : "Password must have at least 5 characters"},
                    })}
                   />
            {errors.password && <div className="invalid-input-message">{errors.password.message}</div>}


            <input className="form-control" name="password_repeat" type="password" placeholder="please confirm pasword" 
                    ref={register({
                        validate: value => value === password.current || "The passwords do not match"  
                })}
                />
            {errors.password_repeat && <div className="invalid-input-message">{errors.password_repeat.message}</div>}

            <input  className="form-control btn btn-primary"  type="submit" value="Sign up"/>
            <div className="error-message-container">
                <div className={"error-message " +  showErrorMessage.class}>{showErrorMessage.message}</div>
            </div>
        </form>
     );
}
 
export default Signup;