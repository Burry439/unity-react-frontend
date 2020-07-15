import React from 'react';
import AdminTable from './adminTable';
import AdminExclude from "./adminExclude"
import {Tabs, Tab} from 'react-bootstrap'
const AdminTabs = ({table,setTable,setFilter}) => {

    const setNewtableEntity = (entityType)=>{
        resetSearchValue()
        setTable(prevState => ({
            entityType : entityType,
            headers : prevState.headers,
            rows : prevState.rows,
            totalCount : prevState.totalCount,
            isLoading : prevState.isLoading,
            exclude : AdminExclude[entityType]
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
             <AdminTable table={table}  setTable={setTable}/> 
        </Tab>
        <Tab eventKey="user" title="users">
            <AdminTable table={table} setTable={setTable}/>
        </Tab>
        <Tab eventKey="game" title="games">
            <AdminTable table={table} setTable={setTable} />
        </Tab>
        <Tab eventKey="text" title="page text">
            <AdminTable table={table} setTable={setTable} />
        </Tab>
    </Tabs>
    );
}
 
export default AdminTabs;