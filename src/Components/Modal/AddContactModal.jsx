import { FOCUSABLE_SELECTOR } from '@testing-library/user-event/dist/utils';
import React, { useContext, useEffect, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from '../../constants';
import { randomN } from '../../utils/random';
import './modalStyle.css'

const AddContactModal = ({ show, onHide }) => {

    const [context, setContext] = useContext(Context);

    const [checkAll, setCheckAll] = useState(true)

    let startSample = {
        "id": '',
        "firstName": "",
        "lastName": "",
        "email": "",
        "description": "",
        "address": {
            "streetAddress": "-------",
            "city": "-------",
            "state": "-------",
            "zip": "-------"
        }
    }

    let startWarningMsg = {
        "firstName": null,
        "lastName": null,
        "email": null,
        "phone": null
    }

    const [newContact, setNewContact] = useState(startSample)

    const [warningMsg, setWarningMsg] = useState(startWarningMsg)

    useEffect(() => {
        let items = Object.values(warningMsg);
        let uniqueArray = [...new Set(items)]

        if (uniqueArray.length === 1 && uniqueArray[0] === true) {
            setCheckAll(false)
        }
        else {
            setCheckAll(true)
        }
    }, [warningMsg])

    const addContactHandler = () => {
        onHide()
        context.paginateDB.unshift(newContact)
        setContext({ ...context, "currentDB": context.paginateDB })
    };

    const closeModal = () => {
        onHide()
        setNewContact(startSample)
        setWarningMsg(startWarningMsg)
        setCheckAll(false)
    }

    const handleInputChange = async (e) => {

        let name = e.target.name
        let value = e.target.value

        if (name === "firstName" || name === "lastName") {
            // let Regex = new RegExp("^[a-zA-ZА-Яа-яё ]+$");
            let reg = /^[a-zA-ZА-Яа-яё ]+$/
            if (!reg.test(value)) {
                setWarningMsg({ ...warningMsg, [name]: 'Тoлько англ, русс и пробелы можно' })
            } else {
                setWarningMsg({ ...warningMsg, [name]: true })
            }
        }

        if (name === "email") {
            let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (!reg.test(value.trim())) {
                setWarningMsg({ ...warningMsg, [name]: 'Incorrect e-mail' })
            } else {
                setWarningMsg({ ...warningMsg, [name]: true })
            }
        }

        if (name === "phone") {
            let reg = /(^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2})$/;
            if (!reg.test(value)) {
                setWarningMsg({ ...warningMsg, [name]: 'The phone must be in the format 123-456-78-90' })
            } else {
                setWarningMsg({ ...warningMsg, [name]: true })
            }
        }

        setNewContact({ ...newContact, [name]: value.trim() })

    };

    return (
        <>
            <Modal show={show} onHide={() => closeModal()} className='modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {/* ---------- ID */}
                    <InputGroup size="sm" className="mb-3 id-input">
                        <InputGroup.Text id="inputGroup-sizing-sm">Id</InputGroup.Text>
                        <Form.Control
                            name='id'
                            type="number"
                            readOnly
                            defaultValue={newContact.id}
                            onFocus={(e) => {
                                e.target.value = randomN()
                                handleInputChange(e)
                            }}
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                        />
                    </InputGroup>
                    <p className='p-id'>ID make random function</p>

                    {/*  --------- First Name  */}
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm">First Name</InputGroup.Text>
                        <Form.Control
                            name='firstName'
                            onChange={(e) => handleInputChange(e)}
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                        />
                    </InputGroup>
                    <p className='p-name'>{warningMsg.firstName}</p>

                    {/* --------- Last Name  */}
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm">Last Name</InputGroup.Text>
                        <Form.Control
                            name='lastName'
                            onChange={(e) => handleInputChange(e)}
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                        />
                    </InputGroup>
                    <p className='p-name'>{warningMsg.lastName}</p>

                    {/* --------- Email  */}
                    <InputGroup size="sm" className="mb-3" >
                        <InputGroup.Text id="inputGroup-sizing-sm">Email</InputGroup.Text>
                        <Form.Control
                            name='email'
                            onChange={(e) => handleInputChange(e)}
                            type='email'
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                        />
                    </InputGroup>
                    <p className='p-name'>{warningMsg.email}</p>

                    <InputGroup size="sm" className="mb-3" >
                        <InputGroup.Text id="inputGroup-sizing-sm">Phone</InputGroup.Text>
                        <Form.Control
                            name='phone'
                            onChange={(e) => handleInputChange(e)}
                            type='tel'
                            placeholder="123-456-78-90"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                        />
                    </InputGroup>
                    <p className='p-name'>{warningMsg.phone}</p>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={() => closeModal()}>
                        Close
                    </Button>
                    <Button disabled={checkAll} variant="primary"
                        onClick={addContactHandler}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddContactModal


// for (let key in newContact) {
//     if (key === "description" || key === "address") {
//         return
//     }
//     else {
//         console.log(key, newContact[key].length);
//         newContact[key].length > 0 ? setCheckAll(true) : setCheckAll(false)
//     }
//     // console.log(key, "=", newContact[key]);
//     // newContact[key].length > 0 && setCheckAll(false)
// }