import React, {useEffect, useState,useContext} from 'react';
import AdminSearch from "./adminSearch"
import AdminPagination from './adminPagination';
import AdminTabs from './adminTabs';
import AdminCreate from './adminCreate';
import {ModalContext} from '../../../contexts/modalContext';
import config from "../../../config"
import { useTranslation } from 'react-i18next';

const Admin = () => {
    const {openModal} = useContext(ModalContext)
    const { i18n } = useTranslation();

    const initialTable = {
        entityType : "user",
        headers : [],
        rows : [],
        totalCount : 0,
        isLoading : true,
        exclude : []
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

    const [table, setTable] = useState(initialTable)
    const [filter, setFilter] = useState(initialFilter)
    const [pagination, setPagination] = useState(initialPagination)

    const setNewTable = async () =>{
        setIsLoading(true)
        const res =  await fetch(`${config.API_URL}/${table.entityType}/adminget${table.entityType}s/?skip=${pagination.skip}&limit=${pagination.limit}&field=${filter.field}&value=${filter.value}`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Language' : i18n.language
            },
        });
        const tableData = await res.json()
        console.log(tableData)
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
                isLoading: prevState.isLoading,
                exclude : tableData.exclude
            }))
        }        
    }

    const setIsLoading = (isLoading) =>{
        setTable(prevState => ({
            ...prevState,
            isLoading : isLoading
        }))
    }

    // set table for first time
    useEffect(() =>{
        setNewTable()
    },[table.entityType])

    useEffect(() =>{
        setNewTable()
    },[pagination.skip])

    return ( 
        <div className="container">
        <AdminSearch filter={filter} setFilter={setFilter} table={table} setNewTable={setNewTable}/>
        <button onClick={() => openModal(() => AdminCreate({table, setTable}))}>Create new {table.entityType}</button>
        <AdminTabs table={table} setTable={setTable} setFilter={setFilter}/>
        <AdminPagination pagination={pagination} setPagination={setPagination} table={table} setNewTable={setNewTable}/>
        </div>
        );
}
 
export default Admin;