import React, {useState} from 'react';
import Form from '../Form/form';
import config from "../../config"

const AdminEdit = ({table, setTable,tr}) => {
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

        const res =  await fetch(`${config.API_URL}/${table.entityType}/adminupdate${table.entityType}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          });

          const response = await validateResponse(res)
          if(response == "success"){
            setFormResponse({
                status : 'success',
                message : "Entity Updated"
            })
        }else{
            setFormResponse({
                status : 'error',
                message : response
            })
       }
    }
    return ( 
        <Form formName={`update${table.entityType}-en`} onSubmit={handleSubmit} formResponse={formResponse} value={tr}/>
     );
}
 
export default AdminEdit;