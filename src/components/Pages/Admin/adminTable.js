import React, {useContext} from 'react';
import {Table, Spinner} from 'react-bootstrap'
import {ModalContext} from '../../../contexts/modalContext';
import AdminEdit from './adminEdit';
import "./admin.css"

const AdminTable = ({table,setTable}) => {
    const {openModal} = useContext(ModalContext)
    if(!table.isLoading){
        return (        
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {table.headers.map((th, index) =>{
                            if(!table.exclude.includes(th))
                            return <th key={index}>{th}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {table.rows.map((tr, index) =>{         
                        return <tr key={index} >{Object.keys(tr).map((td,index) =>{
                            if(!table.exclude.includes(Object.keys(tr)[index])){
                                return <td key={index}>{tr[td].toString()}</td>  
                            }                                      
                        })}
                        <td className="btn-primary table-row" onClick={() => openModal(() => AdminEdit({table,setTable,tr}))}><i className="fa fa-edit"></i></td>
                        </tr>
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