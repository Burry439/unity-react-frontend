import React, {useContext, useEffect, useState} from 'react';
import Pagination from 'react-bootstrap/Pagination'
import { AdminContext } from '../../contexts/adminContext';

const AdminPagination = () => {
    const {pagination, setPagination, table,setNewTable, } = useContext(AdminContext)
    const [active, setActive] = useState(1)

    /// this. will not change table.total count
    const paginate = (skip) =>{
        setActive(2)
        console.log(active)
        setPagination(prevState => ({
            limit : prevState.limit,
            buttons : prevState.buttons,
            skip : skip
        }))
    }

    // this. will not change table.total count
    const setNewPagination = () =>{
        console.log("in set new Pagination: ", pagination.skip, table.totalCount)
        let items = []
        for (let number = pagination.skip + 1; number <= Math.round(table.totalCount / pagination.limit); number ++) {
            const paginateItem = (number - 1) * pagination.limit
            items.push(
              <Pagination.Item key={number} onClick={() => paginate(paginateItem)} >
                {number}
              </Pagination.Item>
            );    
    }
    
    setPagination({
            skip : 0,
            limit : 10,
            buttons : items
        })
    }

    //this runs when someone searches or changes tabs NOT always when setNewTable() is called
    useEffect(() =>{
        setNewPagination()
        // the && is becuase statae is async i want to make sure all relevent fields have been updated before calling useEffect
    }, [table.totalCount])

    return ( 
        <div>
            <Pagination>
                {pagination.buttons}
            </Pagination>
        <p>showing entries {pagination.skip} to {pagination.skip + table.rows.length} out of {table.totalCount}</p>
    </div>
     );
}
 
export default AdminPagination;