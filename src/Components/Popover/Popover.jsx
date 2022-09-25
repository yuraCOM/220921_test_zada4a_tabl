import React from 'react'

import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const MyPopover = (children) => {

    const popover = (

        <Popover id="popover-basic">
            <Popover.Body>
                And here's some <strong>amazing</strong> content. It's very engaging.
                right?
            </Popover.Body>
        </Popover>
    );

    return (
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <Button variant="success">Click me to see</Button>
        </OverlayTrigger>
    )
}

export default MyPopover