import {Button, Col} from "react-bootstrap";
import {PlusSquare} from "react-bootstrap-icons";
import ListGroup from "react-bootstrap/ListGroup";
import React from "react";


export const Channels = () => {
    return (
        <Col className={"col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex"}>
                    <div className={"d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4"}>
                        <b>Каналы</b>
                        <Button type="button" variant="group-vertical" className="p-0 text-primary">
                          <PlusSquare size={20} />
                          <span className="visually-hidden">+</span>
                        </Button>
                    </div>
                    <ListGroup as={'ul'}>
                        {/*{channelsState.map((channel) => (<ListGroup.Item as="li" key={channel.id}>{channel.name}</ListGroup.Item>))}*/}
                    </ListGroup>
                </Col>
    )
}