import React, {useContext} from 'react';
import AdminTable from './adminTable';
import { AdminContext } from '../../contexts/adminContext';
import {Tabs, Tab} from 'react-bootstrap'
const AdminTabs = () => {
    const {table,setTable,setFilter} = useContext(AdminContext)

    const setNewtableEntity = (entityType)=>{
        resetSearchValue()
        setTable(prevState => ({
            entityType : entityType,
            headers : prevState.headers,
            rows : prevState.rows,
            totalCount : prevState.totalCount,
            isLoading : prevState.isLoading
        }))
    }

    const resetSearchValue = () => {
        setFilter(prevState => ({
            dropdown : prevState.dropdown,
            value : "",
            field : prevState.field
        }))
    }

    return (  
        <Tabs activeKey={table.entityType} onSelect={(e) => setNewtableEntity(e)} >
                
        <Tab eventKey="challenge" title="challenges">
             <AdminTable tableHeaders={table.headers} tableRows={table.rows}/> 
        </Tab>
        <Tab eventKey="user" title="users">
        <AdminTable tableHeaders={table.headers} tableRows={table.rows}/>
        </Tab>
        <Tab eventKey="game" title="games">
       
        <AdminTable tableHeaders={table.headers} tableRows={table.rows}/>
        </Tab>
    </Tabs>
    );
}
 
export default AdminTabs;