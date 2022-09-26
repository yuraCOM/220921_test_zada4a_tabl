import React, { useContext, useState } from 'react'
import './heder.css'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { getDB } from '../../utils/tools';
import { Context } from '../../constants';
import MsgModal from '../Modal/MsgModal';
import AddContactModal from '../Modal/AddContactModal';
import Search from '../Search/Search';

const Header = () => {

    const [context, setContext] = useContext(Context);
    const [show, setShow] = useState(false)
    const [info, setInfo] = useState('')
    const [showAddContact, setShowAddContact] = useState(false)


    async function fetchDB(link) {
        await setContext({ ...context, "currentDB": [], 'start': true })
        // await setContext({ ...context, 'start': true })
        let data = await getDB(link)
        await data.sort((x, y) => x.id - y.id)
        let totalPages = Math.ceil(data.length / context.pageLimit)
        let curPagDB = await data.slice(0, context.pageLimit)
        await setContext(
            {
                ...context, "currentDB": curPagDB, 'start': true, "totalRecords": data.length,
                "totalPages": totalPages, "paginateDB": data
            })
    }

    function addContact() {
        if (!context.currentDB.length) {
            setInfo("Загрузите базу!")
            setShow(true)
        } else {
            setShowAddContact(true)
        }

    }

    return (
        <Container fluid>
            <div className='Header flex'>
                <p>Select DB =&gt;</p>
                <Button onClick={() => fetchDB(context.urlDBsmall)} variant="primary">SmallDB</Button>{' '}
                <Button onClick={() => fetchDB(context.urlDBbig)} variant="success">BigDB</Button>{' '}
                {/* {!context.start && <h4> &lt;=== Выберите данные...</h4>} */}
                {context.currentDB.length ? <Button onClick={() => addContact()} variant="info">Add-Contact</Button> : false}
                {context.currentDB.length ? <Search /> : false}
            </div>

            <MsgModal
                show={show}
                onHide={() => setShow(false)}
                msg={info}
            />

            <AddContactModal
                show={showAddContact}
                onHide={() => setShowAddContact(false)} />
        </Container>

    )
}

export default Header