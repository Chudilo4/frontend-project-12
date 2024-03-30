import {Col} from "react-bootstrap";
import React from "react";
import {FormSendMsg} from './FormSendMsg'
import {Messages} from "./Messages";
import {ChannelName} from "./ChannelNameInChat";


export const Chat = (props) => {
    return (
        <Col className={"col p-0 h-100"}>
            <div className={"d-flex flex-column h-100"}>
                    < ChannelName currentNameChannel={props.currentNameChannel}/>
                <div className={"chat-messages overflow-auto px-5 "}>
                    < Messages messages={props.messages} currentChannel={props.currentChannel}/>
                </div>
                <div className={"mt-auto px-5 py-3"}>
                    < FormSendMsg currentChannel={props.currentChannel}/>
                </div>
            </div>
        </Col>
    )
}