import React from 'react';
import {useForm} from "react-hook-form"

const FormField = (props) => {
    const {register, errors} = useForm()

    return ( 
        <>
         <input className="form-control" name={props.name} type={props.name} placeholder="please enter a password" 
                    ref={register({
                        required: "this is required",
                        minLength : {
                            value : 5,
                            message : "Password must have at least 5 characters"
                        },
                    })}
                   />
                    {errors.password && <div className="invalid-input-message">{errors.password.message}</div>}
        </>
     );
}
 
export default FormField;