import React from 'react';
import Table from 'react-bootstrap/Table'

const AdminTable = (props) => {
    console.log(props)
    return ( 
        <Table striped bordered hover>
            <thead>
                    <tr>
                        {props.tableHeaders.map((th) =>{
                            return <th key={th}>{th}</th>
                        })}
                    </tr>
            </thead>
            <tbody>
                {props.tableRows.map((tr, index) =>{
                    return <tr key={index}>{Object.keys(tr).map((td) =>{
                        if(typeof(tr[td] == "string")){
                            return <td key={tr[td].toString()}>{tr[td].toString()}</td>
                        }
                    })}</tr>
                })}
            </tbody>
        </Table>
     );
}
 
export default AdminTable;