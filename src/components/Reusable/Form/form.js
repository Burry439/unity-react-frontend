import React, { useState, useEffect, useCallback,useRef} from 'react'
import FormSpinner from "./spinner"
import Message from "./message"
import Input from './input';
import "./form.css"
import config from '../../../config';
import Select from './select';
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';

const Form = ({ formName, onSubmit, formResponse, value =""}) => {
  const { handleSubmit, register, errors,watch } = useForm();
  const { i18n } = useTranslation();

  const [formExists, setFormExist] = useState(true)

  const [form, setForm] = useState({
    config : {},
    fields : []
  })

  const getForm = async () =>{
    let form;
    try{
      form = require(`../../../forms/${i18n.language}/${formName}`).default
    }catch{
      try{
        form = require(`../../../forms/en/${formName}`).default
      }
      catch{
        return setFormExist(false)
      }
    }
    
    setForm({
        fields : form.fields.map(field => ({
          ...field,
        })),
        config : form.config
      })
    }
  
  useEffect(() =>{
    //get form fields
    getForm()
  },[])

  const handleFormSubmit = e => {
    onSubmit(e)
  }
  
    if(formExists){
      return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {form.fields.map(field => {
            console.log(field)
            if(field.type == "select"){  
            return <Select key={field.name} currentValue={value[field.name]} field={field} formValidation={{register}}/>
            }else{  
              return <Input key={field.name} initalValue={value[field.name]} field={field} formValidation={{register,errors,watch}}/>
            }
       })}
          
          <div className="form-bottom">
            <button disabled={formResponse.status === 'success'} type="submit">
              {form.config.buttonText}
            </button>
            <FormSpinner loading={formResponse.status === 'loading' && form.config.spinner} />
          </div>
          <Message status={formResponse.status} text={formResponse.message} />
        </form>
      )
    }else{
      return <div>Whoops cant find that form</div>
    }
 
  }

export default Form;