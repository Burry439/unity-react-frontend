import React, {useEffect, useContext} from 'react';
import { AdminContext } from '../../contexts/adminContext';
import AdminSearch from "./adminSearch"
import AdminPagination from './adminPagination';
import AdminTabs from './adminTabs';
const Admin = () => {
    const {table,setNewTable,pagination} = useContext(AdminContext)

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
           <AdminTabs/>
            <AdminPagination/>
    
            </div>
         );
}
 
export default Admin;