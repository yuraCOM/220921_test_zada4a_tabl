import React from 'react'
import './tableItem.css'
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const TableItem = ({ item, i }) => {

    const popover = (

        <Popover id="popover-basic">
            <Popover.Body>
                <p>Выбран пользователь <b>{item.firstName + ' ' + item.lastName}</b></p>
                <label htmlFor="description">Описание:</label>
                <textarea id="description" name="description" defaultValue={item.description}
                    rows="3" cols="33">
                </textarea>
                <p>Адрес проживания: <b>{item.address.streetAddress}</b></p>
                <p>Город: <b>{item.address.city}</b></p>
                <p>Провинция/штат: <b>{item.address.state}</b></p>
                <p> Индекс: <b>{item.address.zip}</b></p>

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
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
            </tr>
        </OverlayTrigger>
    )
}

export default TableItem