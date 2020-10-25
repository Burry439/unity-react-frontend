import React from 'react';
import formStyle from "./form.module.scss"

const SelectField = ({ field, currentValue,formValidation}) => {
    const { label, key, validation,...attributes } = field
    const {register} = formValidation
    return (
      <div>
      <React.Fragment>
      <label className={formStyle["form-field-label"]}>{label}</label>
    <select  defaultValue={currentValue} {...attributes} ref={register}>
      {field.options.map(option => (
        <option key={option} name={field.name} value={option}>{option}</option>
      ))}
    </select>
      </React.Fragment>
      </div>
    )
  }

  
  export default SelectField