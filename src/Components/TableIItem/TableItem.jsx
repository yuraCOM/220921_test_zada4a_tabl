import React from 'react'
import './tableItem.css'
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

let x = {
    "gender": "male",
    "name": {
        "title": "Mr",
        "first": "Madhav",
        "last": "Salian"
    },
    "location": {
        "street": {
            "number": 687,
            "name": "Vellala St"
        },
        "city": "Madanapalle",
        "state": "Madhya Pradesh",
        "country": "India",
        "postcode": 16641,
        "coordinates": {
            "latitude": "9.5957",
            "longitude": "-57.7256"
        },
        "timezone": {
            "offset": "+1:00",
            "description": "Brussels, Copenhagen, Madrid, Paris"
        }
    },
    "email": "madhav.salian@example.com",
    "login": {
        "uuid": "9c71f891-b6d7-4139-bb35-5201b12d940a",
        "username": "brownfrog405",
        "password": "police",
        "salt": "Qy1BfmJR",
        "md5": "d592f14922685cee360311a1e8c79404",
        "sha1": "44bc7ff0620b81c2db37d3244f87ecb85abe9d23",
        "sha256": "e9c37be909eed37a188ce24f72d791e12b93ad9ba909ea0e3206a7797a1d35d0"
    },
    "dob": {
        "date": "1951-10-21T19:54:02.405Z",
        "age": 71
    },
    "registered": {
        "date": "2003-02-26T11:49:52.235Z",
        "age": 19
    },
    "phone": "9018620664",
    "cell": "7528450193",
    "id": {
        "name": "UIDAI",
        "value": "004379471885"
    },
    "picture": {
        "large": "https://randomuser.me/api/portraits/men/8.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/8.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/8.jpg"
    },
    "nat": "IN"
}


const TableItem = ({ item, i }) => {

    const popover = (

        <Popover id="popover-basic">
            <Popover.Body>
                <p>Выбран пользователь <b>{item.name.first + ' ' + item.name.last}</b></p>
                <label htmlFor="description">Описание:</label>
                <textarea id="description" name="description" defaultValue={item.login.username}
                    rows="3" cols="33">
                </textarea>
                <p>Адрес проживания: <b>{item.location.street.name}</b></p>
                <p>Город: <b>{item.location.city}</b></p>
                <p>Провинция/штат: <b>{item.location.state}</b></p>
                <p> Индекс: <b>{item.location.postcode}</b></p>

            </Popover.Body>
        </Popover>
    );

    function tableItemHandler(e) {
        // e.currentTarget.classList.add('active')
        e.currentTarget.classList.toggle('active');
        // e.stopPropagation()
        // e.preventDefault()

    }

    return (
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <tr className='table-item' onClick={(e) => tableItemHandler(e)}>
                <td>{'#' + i}</td>
                <td>{Number(Date.parse(item.registered.date))}</td>
                <td>{item.name.first}</td>
                <td>{item.name.last}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
            </tr>
        </OverlayTrigger>
    )
}

export default TableItem