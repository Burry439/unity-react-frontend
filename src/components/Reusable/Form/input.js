import React from 'react';
import "./form.css"

const Field = ({ field,formValidation,initalValue,direction}) => {

  console.log(direction)

  
   const { label, key,validation, ...attributes } = field
    const {register,errors,watch} = formValidation
    const name = attributes.name

    return (
      <div style={direction}>
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
            
            case  "email" : 
            return<> 
            <input  key={key}  defaultValue={initalValue} {...attributes}  type="input" ref={register(validation)}/>
            {errors[name] && <div className="invalid-input-message">{errors[name].message}</div>}
            </>
            //need to find a better solution for comparing
            case 'confirmpassword':
              return <>
              <input key={key}   defaultChecked={initalValue} {...attributes} type="password" ref={register({
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