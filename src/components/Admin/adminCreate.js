import React, {useState} from 'react';
import Form from '../Form/form';
import config from "../../config"

const AdminCreate = ({table, setTable}) => {
  console.log(table)
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
            setTable(prevState =>({
                ...prevState,
                totalCount : prevState.totalCount + 1,
                rows : [...prevState.rows,newEntity]
            }))
          return("success")
        }
      }

    const handleSubmit = async (data) =>{
        setFormResponse({
            status : 'loading',
            message : ''
        })

        const res =  await fetch(`${config.API_URL}/${table.entityType}/create${table.entityType}`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          });

          const response = await validateResponse(res)
          if(response == "success"){
            setFormResponse({
                status : 'success',
                message : "Entity created"
            })
        }else{
           // setMessage(res)
            setFormResponse({
                status : 'error',
                message : response
            })
       }
    }
    return ( 
        <Form formName={`create${table.entityType}-en`} onSubmit={handleSubmit} formResponse={formResponse}/>
     );
}
 
export default AdminCreate;