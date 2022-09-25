import React, { useContext, useState, } from 'react'
import './mainTable.css'
import Table from 'react-bootstrap/Table';
import TableItem from '../TableIItem/TableItem';
import { str_randLen } from '../../utils/random'
import { Context } from '../../constants';
import Loader from '../Loader/Loader';
import MyPagination from '../Pagination/Pagination';

const MainTable = () => {

    const tableHeadArr = {
        "#": '',
        "ID": "id",
        "First Name": "firstName",
        "Last Name": "lastName",
        "Email": "email",
        "Phone": "phone"
    }

    const [context, setContext] = useContext(Context);

    const [sortByField, setSortByField] = useState('')
    const [sortDirect, setSortDirect] = useState(null)
    const [arrow, setArrow] = useState(null)

    function sortId(type) {

        !sortDirect ?
            setArrow(<p className='arrow-sort'>&darr;</p>) :
            setArrow(<p className='arrow-sort'>&uarr;</p>)

        setSortByField(type)

        if (sortDirect === null) {
            setSortDirect(false)
        }

        let sortData = context.currentDB

        if (type === 'id') {
            !sortDirect ?
                sortData.sort((x, y) => x.id - y.id) :
                sortData.sort((x, y) => y.id - x.id)
        }

        if (type === 'firstName' || type === 'lastName' || type === 'email' || type === 'phone') {
            !sortDirect ?
                sortData.sort((x, y) => x[type].localeCompare(y[type])) :
                sortData.sort((x, y) => y[type].localeCompare(x[type]))
        }

        setContext({ ...context, "currentDB": sortData })
        setSortDirect(!sortDirect)
    }

    return (
        <div>
            {!context.start && <h3>Выберите данные...</h3>}
            {context.paginateDB.length >= 50 && <MyPagination />}

            <Table striped bordered hover>
                <thead className='main-table-head'>
                    <tr>
                        {Object.keys(tableHeadArr).map(el =>
                            <th key={str_randLen(5)} onClick={() => sortId(tableHeadArr[el])}>
                                {el}
                                {sortByField === tableHeadArr[el] && arrow}
                            </th>)
                        }

                    </tr>
                </thead>
                <tbody>
                    {context.currentDB.map((item, i) =>
                        <TableItem key={str_randLen(7)} item={item} i={i + 1} />
                    )}
                </tbody>
            </Table>

            {context.start && !context.currentDB.length &&
                <div className='spinner' >
                    <h5>Загрузка...</h5>
                    <Loader></Loader>
                </div>}
        </div>
    )
}

export default MainTable