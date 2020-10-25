import React,{useState,useContext, useRef} from 'react';
import { UserContext } from "../../../contexts/userContext";
import {ModalContext} from '../../../contexts/modalContext';
import { useForm } from "react-hook-form";
import Form from '../Form/form';


const Signup = () => {
    const {signup} = useContext(UserContext)
    const {closeModal} = useContext(ModalContext)
    const [formResponse, setFormResponse] = useState({
        status : '',
        message : ''
    })

    const handleSubmit = async (values) =>{
        setFormResponse({
            status : 'loading',
            message : ''
        })
        const res = await signup(values)
        if(res == "success"){
            closeModal();
        }else{
            setFormResponse({
                status : 'error',
                message : res
            })
             setTimeout(() =>{
                setFormResponse({
                    status : '',
                    message : ''   
                })
             }, 3000)
       }
    } 

    return ( 
        <Form formName="signup" onSubmit={handleSubmit} formResponse={formResponse}/>
     );
}
 
export default Signup;