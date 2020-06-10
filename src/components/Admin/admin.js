import React, {useEffect, useContext} from 'react';
import { AdminContext } from '../../contexts/adminContext';
import AdminSearch from "./adminSearch"
import AdminPagination from './adminPagination';
import AdminTabs from './adminTabs';
import AdminCreate from './adminCreate';
import {ModalContext} from '../../contexts/modalContext';

const Admin = () => {
    const {table,setNewTable,pagination} = useContext(AdminContext)
    const {openModal} = useContext(ModalContext)

    // set table for first time
    useEffect(() =>{
        setNewTable()
    },[table.entityType])

    useEffect(() =>{
        setNewTable()
    },[pagination.skip])


        return ( 
            <div className="container">
            <AdminSearch/>
            <button onClick={() => openModal(AdminCreate)}>Create new {table.entityType}</button>
           <AdminTabs/>
            <AdminPagination/>
            </div>
         );
}
 
export default Admin;