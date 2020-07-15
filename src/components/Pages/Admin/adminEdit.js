import React, {useState} from 'react';
import Form from '../../Reusable/Form/form';
import config from "../../../config"
import { useTranslation } from 'react-i18next';

const AdminEdit = ({table, setTable,tr}) => {
    const { i18n } = useTranslation();

    const errorStatus = ["404","500","401"] 
    const [formResponse, setFormResponse] = useState({
        status : '',
        message : ''
    })

    const validateResponse = async (res) =>{
        if(errorStatus.includes(res.status.toString())){
          return await res.text()
        }else{
            const newEntity = await res.json()
            const updatedRows = table.rows.map((row) =>{
                if(row._id == newEntity._id){    
                    return row = newEntity
                } else{
                    return row
                }
            })
            setTable(prevState =>({
                ...prevState,
                rows : updatedRows
            }))
          return("success")
        }
      }

    const handleSubmit = async (data) =>{
        //we dont get the id from the form so we set it here
        data._id = tr._id
        setFormResponse({
            status : 'loading',
            message : ''
        })

        const res =  await fetch(`${config.API_URL}/admin/update/?entityType=${table.entityType}`, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
              'Language' : i18n.language
            },
            body: JSON.stringify(data) 
          });

          const response = await validateResponse(res)
          if(response == "success"){
            setFormResponse({
                status : 'success',
                message : `Updated ${table.entityType}`
            })
        }else{
            setFormResponse({
                status : 'error',
                message : response
            })
       }
    }
    return ( 
        <Form formName={`update${table.entityType}`} onSubmit={handleSubmit} formResponse={formResponse} value={tr}/>
     );
}
 
export default AdminEdit;