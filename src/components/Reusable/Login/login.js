import React,{useState,useContext} from 'react';
import { UserContext } from "../../../contexts/userContext";
import {ModalContext} from '../../../contexts/modalContext';
import Form from '../Form/form';
 const Login = () => {
    const {login} = useContext(UserContext)
    const {closeModal} = useContext(ModalContext)
    const [formResponse, setFormResponse] = useState({
        status : '',
        message : ''
    })

    const handleSubmit = async (data) =>{
        setFormResponse({
            status : 'loading',
            message : ''
        })
        const res = await login(data)
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
        <Form formName="login" onSubmit={handleSubmit} formResponse={formResponse}/>
     );
}
 
export default Login;