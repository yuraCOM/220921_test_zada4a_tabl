import React, { useContext, useEffect, useState } from 'react'
import Pagination from 'react-bootstrap/Pagination';
import { Context } from '../../constants';


const MyPagination = () => {

    const [context, setContext] = useContext(Context);
    const [active, setActive] = useState(context.currentPage)

    let items = [];

    for (let number = 1; number <= context.totalPages; number++) {
        items.push(
            <Pagination.Item
                key={number + 'pag'}
                active={number === active}
                onClick={() => paginatorHadler(number)}
            >
                {number}
            </Pagination.Item>,
        );
    }

    async function paginatorHadler(num) {
        setActive(num)
        context.currentPage = num
        // setContext({ ...context, "currentPage": num })
        const offset = (context.currentPage - 1) * context.pageLimit;
        // console.log(context.currentPage, 'start', offset, 'end', offset + context.pageLimit);
        const curPagDB = context.paginateDB.slice(offset, offset + context.pageLimit);
        context.currentDB = curPagDB
        setContext({ ...context, "currentDB": curPagDB })
    }

    return (
        <div>
            <Pagination size="sm" >{items}</Pagination>
        </div>
    )
}

export default MyPagination