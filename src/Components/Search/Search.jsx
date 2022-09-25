import React, { useContext, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { Context } from '../../constants';
import { updContext } from '../../utils/tools';

const Search = () => {

    const [context, setContext] = useContext(Context);

    const [findText, setFindText] = useState('')

    // save original DB
    const [flagSaveDB, setFlagSaveDB] = useState(false)
    const [original, setOriginal] = useState([])

    function find(txt) {
        txt = txt.toLowerCase()

        if (!flagSaveDB) {
            setOriginal(context.paginateDB)
            setFlagSaveDB(true)
        }

        if (!txt) {
            alert('Nothing found.....')
        }

        else {
            let searchDB = context.paginateDB.filter(item => {

                return item["firstName"].toString().toLowerCase().includes(txt)
                    || item["lastName"].toString().toLowerCase().includes(txt)
                    || item["email"].toString().toLowerCase().includes(txt)
                    || item["phone"].toString().toLowerCase().includes(txt)
                    || item["id"].toString().toLowerCase().includes(txt)
            }
            )

            if (!searchDB.length) {
                alert('Ничего не найдено')

            } else {
                updContext(context, setContext, searchDB)
            }

        }
        setFindText('')
    }

    function clearSearch() {
        if (flagSaveDB) {
            updContext(context, setContext, original)
            setFlagSaveDB(false)
            setOriginal([])
        }

    }

    return (
        <InputGroup className="mb-0">
            <Form.Control
                onChange={(e) => setFindText(e.target.value)}
                placeholder="Поиск..."
                value={findText}
            />
            <Button
                onClick={() => find(findText)}
                variant="outline-secondary"
                id="button-addon2">
                Найти
            </Button>
            <Button
                onClick={() => clearSearch()}
                variant="outline-warning"
                id="button-addon2">
                X
            </Button>
        </InputGroup>
    )
}

export default Search