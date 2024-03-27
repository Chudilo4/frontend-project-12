import React from 'react'
import ListGroup from "react-bootstrap/ListGroup";

export const Messages = (props) => {
    const { children } = props
    return children.map((message) => (
        <ListGroup.Item as="div" key={message.id} className="text-break mb-2">
            <b>{message.username}</b>: {message.text}
        </ListGroup.Item>))
}