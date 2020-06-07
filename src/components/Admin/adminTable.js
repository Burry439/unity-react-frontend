import React, {useEffect, useContext} from 'react';
import { AdminContext } from '../../contexts/adminContext';
import {Table, Spinner} from 'react-bootstrap'

const AdminTable = (props) => {
    const {table} = useContext(AdminContext)
    
    if(!table.isLoading){
        return (        
            <Table striped bordered hover>
                <thead>
                        <tr>
                            {props.tableHeaders.map((th, index) =>{
                                return <th key={index}>{th}</th>
                            })}
                        </tr>
                </thead>
                <tbody>
                    {props.tableRows.map((tr, index) =>{
    
                        return <tr key={index}>{Object.keys(tr).map((td,index) =>{
                                return <td key={index}>{tr[td].toString()}</td>               
                        })}</tr>
                    })}
                </tbody>
            </Table>
         );
    }else{
        return <>
        <Spinner animation="border" variant="primary" />
        <Spinner animation="border" variant="secondary" />
        <Spinner animation="border" variant="success" />
        <Spinner animation="border" variant="danger" />
        <Spinner animation="border" variant="warning" />
        <Spinner animation="border" variant="info" />
        <Spinner animation="border" variant="light" />
        <Spinner animation="border" variant="dark" />
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="info" />
        <Spinner animation="grow" variant="light" />
        <Spinner animation="grow" variant="dark" />
      </>
    }

}
 
export default AdminTable;