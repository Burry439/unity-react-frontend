import React, {useState, useContext} from 'react';
import Form from '../Form/form';
import config from "../../config"
import { AdminContext } from '../../contexts/adminContext';



const AdminCreate = () => {
    const errorStatus = ["404","500","401"] 
    const {table, setTable} = useContext(AdminContext)

    const [formResponse, setFormResponse] = useState({
        status : '',
        message : ''
    })

    const validateResponse = async (res) =>{
        console.log(res)
        if(errorStatus.includes(res.status.toString())){
            console.log(" in error")
          return await res.text()
        }else{
            const newEntity = await res.json()
            console.log(newEntity)
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
          console.log(response)
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