import React, {useContext, useEffect} from 'react';
import {Form} from 'react-bootstrap'
import { AdminContext } from '../../contexts/adminContext';

const AdminSearch = () => {
    const {filter, setFilter, table,setNewTable} = useContext(AdminContext)

    const setDropdown = async () =>{
        let items = []
        table.headers.forEach((header) =>{
        items.push(<option key={header}>{header}</option>)
        })
        setFilter(prevState => ({
            field : prevState.field,
            value : prevState.value,
            dropdown : items
        }))
    }

    const setSearchField = (field) =>{
        setFilter(prevState => ({
            dropdown :  prevState.dropdown,
            value : prevState.value,
            field : field
        }))
    }

    const setSearchValue = (value) => {
        setFilter(prevState => ({
            dropdown : prevState.dropdown,
            value : value,
            field : prevState.field
        }))
    }

    // get new dropdown options when changing table headers
    useEffect(() =>{
            setDropdown()
    }, [table.headers])
    
    return ( 
        <div className="search-container">
        <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Search By</Form.Label>
                <Form.Control as="select" custom onChange={e =>setSearchField(e.target.value)}>
                    {filter.dropdown}
                </Form.Control>
            </Form.Group>
        <div className="input-group mb-3">
            <input type="text" className="form-control" value={filter.value} onChange={(e) => setSearchValue(e.target.value)}/>
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={() => setNewTable()}>Button</button>
        </div>
      </div>
  </div>
     );
}
 
export default AdminSearch;