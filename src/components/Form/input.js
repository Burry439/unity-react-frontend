import React, {useRef,useEffect} from 'react';
import "./form.css"

const Field = ({ field, onChange,formValidation}) => {
   const { label, key,validation, ...attributes } = field
    const {register,errors,watch} = formValidation
    // const password = useRef();
    // // incase we need to match passwords
    //   password.current = watch("password","scscsc");
     
    const name = attributes.name
    console.log(attributes)
    return (
      <div>
      <React.Fragment>
        <label>{label}</label>
        {(() => {
          switch (attributes.type) {
            case  "email" : 
            return<> 
            <input  key={key} type="input" onChange={onChange} {...attributes} ref={register({
                        required: validation.required,
                        pattern: {value:/^\S+@\S+\.\S+$/ ,message: validation.pattern.message}
                    })}/>
          {errors[name] && <div className="invalid-input-message">{errors[name].message}</div>}
          </>
            case 'textarea':
            return <>
                   <textarea key={key} autoFocus onChange={onChange} {...attributes} ref={register(validation)}/>
                   {errors[name] && <div className="invalid-input-message">{errors[name].message}</div>}
                   </>
            default:
              return<> 
              <input  key={key} onChange={onChange} {...attributes} ref={register(validation)}/>
            {errors[name] && <div className="invalid-input-message">{errors[name].message}</div>}
            </>
          }
        })()}
      </React.Fragment>
      </div>
    )
  }

  
  export default Field