import React from 'react';
import inputStyles from "./input.module.scss"
import formStyles from "./form.module.scss"

const Field = ({ field,formValidation,initalValue}) => {
  
   const { label, key,validation, ...attributes } = field
    const {register,errors,watch} = formValidation
    const name = attributes.name

    return (
      <div className={inputStyles["input-container"]}>
        <React.Fragment>
        <label className={formStyles["form-field-label"]}>{label}</label>
        {(() => {
          switch (attributes.type) {
            case 'textarea':
            return <>
            <textarea  key={key} className={inputStyles["input"]} autoFocus  defaultValue={initalValue} {...attributes} ref={register(validation)}/>
            {errors[name] && <div className={inputStyles["invalid-input-message"]}>{errors[name].message}</div>}
            </>
            case 'checkbox':
            return <>
            <input  key={key} className={inputStyles["input"]}    defaultChecked={initalValue} {...attributes} ref={register(validation)}/>
            {errors[name] && <div className={inputStyles["invalid-input-message"]}>{errors[name].message}</div>}
            </>            
            
            case  "email" : 
            return<> 
            <input  key={key}  className={inputStyles["input"]}    defaultValue={initalValue} {...attributes}  type="input" ref={register(validation)}/>
            {errors[name] && <div className={inputStyles["invalid-input-message"]}>{errors[name].message}</div>}
            </>
            //need to find a better solution for comparing
            case 'confirmpassword':
              return <>
              <input  key={key}  className={inputStyles["input"]}   defaultChecked={initalValue} {...attributes} type="password" ref={register({
                validate: (value) => {
                  return value === watch('password'); // value is from password2 and watch will return value from password1
                }})}/>
              {errors[name] && <div className={inputStyles["invalid-input-message"]}>{validation.message}</div>}
              </>
            /////
            default:
              return<> 
            <input key={key} className={inputStyles["input"]}   defaultValue={initalValue} {...attributes} ref={register(validation)}/>
            {errors[name] && <div className={inputStyles["invalid-input-message"]}>{errors[name].message}</div>}
            </>
          }
        })()}
        </React.Fragment>
      </div>
    )
  }

  
  export default Field