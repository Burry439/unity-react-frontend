import React, {useEffect,useState} from 'react';
import Select from 'react-select'
import "./form.css"

const SelectField = ({ field, onChange,currentValue}) => {
    const { label, key, ...attributes } = field
    const [options, setOptions] = useState()
    useEffect(() =>{
      let o = []
      field.options.forEach(option => {
        o.push({value : option[Object.keys(option)[1]], label : option[Object.keys(option)[1]], name : field.name} )
      });
      setOptions(o)
    },[])
   
    return (
      <div>
      <React.Fragment>
        <label>{label}</label>
        {/* the defualt value only sets the label the value part seems to be brokn so i am setting it in te form itself */}
        <Select options={options}  onChange={onChange} defaultValue={{label : currentValue, value : currentValue}}/>
      </React.Fragment>
      </div>
    )
  }

  
  export default SelectField