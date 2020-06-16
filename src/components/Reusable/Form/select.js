import React from 'react';
import "./form.css"

const SelectField = ({ field, currentValue,formValidation}) => {
    const { label, key, validation,...attributes } = field
    const {register} = formValidation
    return (
      <div>
      <React.Fragment>
      <label>{label}</label>
    <select className="form-control" defaultValue={currentValue} {...attributes} ref={register}>
      {field.options.map(option => (
        <option key={option} name={field.name} value={option}>{option}</option>
      ))}
    </select>
      </React.Fragment>
      </div>
    )
  }

  
  export default SelectField