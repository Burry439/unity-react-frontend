import React from 'react';
import useForm from "react-hook-form"

const Form = () => {
    const {register, handleSubmit, errors} = useForm()

    const onSubmit = (data) =>{
        console.log(data)
    }

    return ( 
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="username" ref={register({required : true, minLength : 8})}/>
            <input type="text" placeholder="pasword" ref={register}/>

            {errors.password && <p>text</p>}
        </form>
     );
}
 
export default Form;