import React, {useState, useContext} from 'react';
import Form from '../Form/form';
import config from "../../config"
import { AdminContext } from '../../contexts/adminContext';



const AdminEdit = (props) => {
    console.log(props)
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
            const updatedRows = table.rows.map((row) =>{
                console.log(row)
                if(row._id == newEntity._id){    
                    return row = newEntity
                } else{
                    return row
                }
            })
            console.log(updatedRows)
            setTable(prevState =>({
                ...prevState,
                rows : updatedRows
            }))
          return("success")
        }
      }

    const handleSubmit = async (data) =>{
        console.log(data)
        //we dont get the id from the form so we set it here
        data._id = props._id
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
          console.log(response)
          if(response == "success"){
            setFormResponse({
                status : 'success',
                message : "Entity Updated"
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
        <Form formName={`update${table.entityType}-en`} onSubmit={handleSubmit} formResponse={formResponse} value={props}/>
     );
}
 
export default AdminEdit;