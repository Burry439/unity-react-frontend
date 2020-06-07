import React, {createContext, useState} from 'react';
import config from "../config"
import Pagination from 'react-bootstrap/Pagination'

export const AdminContext = createContext();


const initialTable = {
        entityType : "user",
        headers : [],
        rows : [],
        totalCount : 0,
        isLoading : true
}

const initialFilter = {
    dropdown : [],
    field : "_id",
    value : ""
}

const initialPagination = {
    buttons : [],
    skip : 0,
    limit : 10
}

const AdminContextProvider = (props) => {
    
    const [table, setTable] = useState(initialTable)
    const [filter, setFilter] = useState(initialFilter)
    const [pagination, setPagination] = useState(initialPagination)


    //called in use effect
    const setNewTable = async () =>{

        console.log("in setNewTable")

        setIsLoading(true)
        const res =  await fetch(`${config.API_URL}/${table.entityType}/adminget${table.entityType}s/?skip=${pagination.skip}&limit=${pagination.limit}&field=${filter.field}&value=${filter.value}`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
          });
        const tableData = await res.json()
        setIsLoading(false)
        if(res.status == 200){
            const tableRows = tableData.entities ? tableData.entities : tableData.headers
            const headers = Object.keys(tableRows[0])
            setTable(prevState => ({
                    entityType : prevState.entityType,
                    // if we got back data and not just field names set rows
                    rows :   tableData.entities ? tableData.entities : [],
                    headers : headers,
                    totalCount : tableData.totalCount,
                    isLoading: prevState.isLoading
            }))
        }        
    }
    const setIsLoading = (isLoading) =>{
        setTable(prevState => ({
            ...prevState,
            isLoading : isLoading
        }))
    }

    return(
        <AdminContext.Provider value={{table,setTable,setNewTable, filter, setFilter, pagination, setPagination}}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider


