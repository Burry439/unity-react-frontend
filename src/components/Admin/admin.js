import React, {useState, useEffect} from 'react';
import {Tabs, Tab} from 'react-bootstrap'
import AdminTable from './adminTable';
import config from "../../config"

const Admin = () => {

    const [table, setTable] = useState({
            headers : [],
            rows : [],
    })

    const sortTable = (tables) =>{
        //get table headers
        const headers = Object.keys(tables[0])
        //set table headers
        setTable({
            rows :  tables,
            headers : headers
        })
    }


    const setNewTable = async (entityType, filter) =>{
        const res =  await fetch(`${config.API_URL}/${entityType}/get${entityType}s`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
            },
          });
        const tableData = await res.json()
        sortTable(tableData)
    }

    useEffect(() =>{
        setNewTable("user")
    },[])

    return ( 
        <div className="container">
        <Tabs defaultActiveKey="challenges" id="uncontrolled-tab-example">
            <Tab eventKey="challenges" title="challenge" onSelect={() => setNewTable("challenge")}>
                <AdminTable tableHeaders={table.headers} tableRows={table.rows}/>
            </Tab>
            <Tab eventKey="users" title="user" onSelect={() => setNewTable("user")}>
                <AdminTable tableHeaders={table.headers} tableRows={table.rows}/>
            </Tab>
            <Tab ref="games" eventKey="games" title="game" onSelect={() => setNewTable("game")}>
             <AdminTable tableHeaders={table.headers} tableRows={table.rows}/>
            </Tab>
        </Tabs>
        </div>
     );
}
 
export default Admin;