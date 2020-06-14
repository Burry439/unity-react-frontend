import React, {useEffect} from 'react';
import "./form.css"

const Field = ({ field,formValidation,initalValue}) => {
   const { label, key,validation, ...attributes } = field
    const {register,errors,watch} = formValidation
    const name = attributes.name

    return (
      <div>
      <React.Fragment>
        <label>{label}</label>
        {(() => {
          switch (attributes.type) {
            case 'textarea':
            return <>
            <textarea key={key} autoFocus  defaultValue={initalValue} {...attributes} ref={register(validation)}/>
            {errors[name] && <div className="invalid-input-message">{errors[name].message}</div>}
            </>
            case 'checkbox':
            return <>
            <input key={key}   defaultChecked={initalValue} {...attributes} ref={register(validation)}/>
            {errors[name] && <div className="invalid-input-message">{errors[name].message}</div>}
            </>            
            //these two are for specific types of inputs
            case  "email" : 
            return<> 
            <input  key={key} type="input"  defaultValue={initalValue} {...attributes} ref={register({
                required: validation.required,
                pattern: {value:/^\S+@\S+\.\S+$/ ,message: validation.pattern.message}
            })}/>
            {errors[name] && <div className="invalid-input-message">{errors[name].message}</div>}
            </>
            case 'confirmpassword':
              return <>
              <input key={key}  type="password" defaultChecked={initalValue} {...attributes} ref={register({
                validate: (value) => {
                  return value === watch('password'); // value is from password2 and watch will return value from password1
                }})}/>
              {errors[name] && <div className="invalid-input-message">{validation.message}</div>}
              </>
            /////
            default:
              return<> 
            <input  key={key} defaultValue={initalValue} {...attributes} ref={register(validation)}/>
            {errors[name] && <div className="invalid-input-message">{errors[name].message}</div>}
            </>
          }
        })()}
      </React.Fragment>
      </div>
    )
  }

  
  export default Field