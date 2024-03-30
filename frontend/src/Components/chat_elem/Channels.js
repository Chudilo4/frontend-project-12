import {Col} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import React from "react";
import {AddChannel} from "./AddChannel";
import Dropdown from 'react-bootstrap/Dropdown';

export const Channels = (props) => {
    return (
        <Col className={"col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex"}>
            <div className={"d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4"}>
                <b>Каналы</b>
                <AddChannel />
            </div>
            <ListGroup as={'ul'}>
                {props.channels.map((channel) =>
                  <ListGroup.Item as="li" key={channel.id} value={channel.id} onClick={props.callbackSetCurrentChannel} active={props.currentChannel == channel.id ? true: false}>
                    {channel.name}
                  </ListGroup.Item>
                )
                }
            </ListGroup>
        </Col>
    )
}