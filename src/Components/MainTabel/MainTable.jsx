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
                sortData.sort((x, y) =>
                    Date.parse(x.registered.date) - Date.parse(y.registered.date)
                ) :
                sortData.sort((x, y) => Date.parse(y.registered.date) - Date.parse(x.registered.date))
        }

        if (type === 'firstName') {
            !sortDirect ?
                sortData.sort((x, y) => x.name.first.localeCompare(y.name.first)) :
                sortData.sort((x, y) => y.name.first.localeCompare(x.name.first))
        }

        if (type === 'lastName') {
            !sortDirect ?
                sortData.sort((x, y) => x.name.last.localeCompare(y.name.last)) :
                sortData.sort((x, y) => y.name.last.localeCompare(x.name.last))
        }

        if (type === 'email') {
            !sortDirect ?
                sortData.sort((x, y) => x.email.localeCompare(y.email)) :
                sortData.sort((x, y) => y.email.localeCompare(x.email))
        }

        if (type === 'phone') {
            !sortDirect ?
                sortData.sort((x, y) => x.phone.localeCompare(y.phone)) :
                sortData.sort((x, y) => y.phone.localeCompare(x.phone))
        }
        // !sortDirect ?
        //     sortData.sort((x, y) => x[type].localeCompare(y[type])) :
        //     sortData.sort((x, y) => y[type].localeCompare(x[type]))

        setContext({ ...context, "currentDB": sortData })
        setSortDirect(!sortDirect)
    }

    return (
        <div>
            {context.paginateDB.length >= 50 && <MyPagination />}

            {context.start && <Table striped bordered hover>
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

            </Table>}

            {!context.start && <h3>Выберите данные...</h3>}

            {context.start && !context.currentDB.length &&
                <div className='spinner' >
                    <h5>Загрузка...</h5>
                    <Loader></Loader>
                </div>}
        </div>
    )
}

export default MainTable