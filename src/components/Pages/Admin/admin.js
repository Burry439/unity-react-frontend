import React, {useEffect, useState,useContext} from 'react';
import AdminSearch from "./adminSearch"
import AdminPagination from './adminPagination';
import AdminTabs from './adminTabs';
import AdminCreate from './adminCreate';
import {ModalContext} from '../../../contexts/modalContext';
import {UserContext} from '../../../contexts/userContext';
import { useHistory } from "react-router-dom";
import config from "../../../config"
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion"

import adminStyles from "./admin.module.scss"

const Admin = () => {
    const {openModal} = useContext(ModalContext)
    const {user} = useContext(UserContext)
    const { i18n } = useTranslation();
    const history = useHistory()

    useEffect(() =>{
        if(user != "loading" && (!user._id || user.role != "admin")){
            history.push("/home")
        }
      },[user])

    const initialTable = {
        entityType : "user",
        headers : [],
        rows : [],
        totalCount : 0,
        isLoading : true,
        exclude : ["completedChallenges","__v", "password"]
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
        const res =  await fetch(`${config.API_URL}/admin/get/?entityType=${table.entityType}&skip=${pagination.skip}&limit=${pagination.limit}&field=${filter.field}&value=${filter.value}&exclude=${table.exclude}`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Language' : i18n.language
            },
        });
        const tableData = await res.json()
        setIsLoading(false)
        if(res.status == 200){
            let headers;
            let rows;
            // if we got an array we have documents in the collections
            if(Array.isArray(tableData.entities)){
                headers = Object.keys(tableData.entities[0])
                rows = tableData.entities
            }else{
                headers = Object.keys(tableData.entities)
                rows = []
            }
            setTable(prevState => ({
                entityType : prevState.entityType,
                rows :   rows,
                headers : headers,
                totalCount : tableData.totalCount,
                isLoading: prevState.isLoading,
                exclude : prevState.exclude
            }))
        } else {
            history.push("/home")
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
        <motion.div className={adminStyles["container"]} exit="exit">
        <AdminSearch filter={filter} setFilter={setFilter} table={table} setNewTable={setNewTable}/>
        <button onClick={() => openModal(() => AdminCreate({table, setTable}))}>Create new {table.entityType}</button>
        <AdminTabs table={table} setTable={setTable} setFilter={setFilter}/>
        <AdminPagination pagination={pagination} setPagination={setPagination} table={table} setNewTable={setNewTable}/>
        </motion.div>
        );
}
 
export default Admin;