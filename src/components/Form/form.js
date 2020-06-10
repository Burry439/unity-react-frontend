import React, { useState, useEffect, useCallback,useRef, memo } from 'react'
import FormSpinner from "./spinner"
import Message from "./message"
import Input from './input';
import "./form.css"
import config from '../../config';
import Select from './select';
import { useForm } from "react-hook-form";

const Form = ({ formName, onSubmit, formResponse, value =""}) => {
  const { handleSubmit, register, errors,watch } = useForm();

  const [formExists, setFormExist] = useState(true)
  const [firstInputLoad, setFirstInputLoad] = useState(true)
  const [firstSelectLoad, setFirstSelectLoad] = useState(true)

  const [form, setForm] = useState({
    config : {},
    fields : []
  })
  const getForm = async () =>{
    const res = await fetch(`${config.API_URL}/form/getform/?formName=${formName}`)
    if(res.status == 404){
      setFormExist(false)
    }else{
      const formData = await res.json()
      setForm({
        fields : formData.fields.map(field => ({
          ...field,
          name: field.name || field.label,
          value: ''
        })),
        config : formData.config
      })
    }
  }
  useEffect(() =>{
    getForm()
  },[])

    const fieldsRef = useRef()
    const updateFields = (name, value) => {
      const newFields = form.fields.map(field => {
        return field.name === name ? { ...field, value } : field
      })
      setForm(prevState => ({
        ...prevState,
        fields : newFields
      }))
    }
  
    useEffect(() => {
      fieldsRef.current = updateFields
    })
  
    useEffect(() => {
      if (formResponse.status === 'success') {
        setForm(prevState => ({
          ...prevState,
          feilds : form.fields.map(field => ({ ...field, value: '' }))
         }))
      }
    }, [formResponse.status, form.fields])
  
    const handleChange = useCallback(e => {
      const name = e.target.getAttribute('name')
      const value = e.target.type == "checkbox" ? e.target.checked : e.target.value
      const update = () => {
        fieldsRef.current(name, value)
      }
  
      update()
    }, [])

    const handleSelectChange = useCallback(e => {
      const update = () => {
        fieldsRef.current(e.name, e.value)
      }
  
      update()
    }, [])
  
    const setInitialInputValues = (field) =>{
      setFirstInputLoad(false)
        if(field.type == "checkbox"){
            field.defaultChecked = value[field.name]
            field.value = value[field.name]
        }else{
          field.value = value[field.name]
        }
        return field
    }

    const handleFormSubmit = e => {
      const formData = form.fields.reduce((fields, field) => {
        return { ...fields, [field.name]: field.value }
      }, {})
      onSubmit(formData)
    }
  
    const { spinner } = form.config
    if(formExists){
      return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {form.fields.map(field => {
            if(field.type == "select"){
              if(firstSelectLoad && value != ""){
                setFirstSelectLoad(false)
                field.value = value[field.name]
            }    
             return <Select key={field.name} field={field} onChange={handleSelectChange} currentValue={value[field.name]}/>
            }else{
               // get initial field value if there is one
              if(firstInputLoad && value != ""){
                field = setInitialInputValues(field)
              }     
               return <Input key={field.name} field={field} onChange={handleChange}  formValidation={{register, errors,watch}}/>
            }
       })}
          
          <div className="form-bottom">
            <button disabled={formResponse.status === 'success'} type="submit">
              {form.config.buttonText}
            </button>
            <FormSpinner loading={formResponse.status === 'loading' && spinner} />
          </div>
          <Message status={formResponse.status} text={formResponse.message} />
        </form>
      )
    }else{
      return <div>Whoops cant find that form</div>
    }
 
  }

export default Form;