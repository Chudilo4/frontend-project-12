import React, {useContext} from 'react'
import ListGroup from "react-bootstrap/ListGroup";

export const Messages = (props) => {
  const {messages, currentChannel} = props;
  const messagesFilter = messages.filter(message => message.channelId === currentChannel)
    return messagesFilter.map((message) => (
        <ListGroup.Item as="div" key={message.id} className="text-break mb-2">
            <b>{message.username}</b>: {message.body}
        </ListGroup.Item>))
}