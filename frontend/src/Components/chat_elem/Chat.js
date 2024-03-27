import {Col} from "react-bootstrap";
import React from "react";
import {FormSendMsg} from './FormSendMsg'
import {Messages} from "./Messages";
import {ChannelName} from "./ChannelNameInChat";


export const Chat = () => {
    return (
        <Col className={"col p-0 h-100"}>
            <div className={"d-flex flex-column h-100"}>
                    < ChannelName name={"Хуета"}/>
                <div className={"chat-messages overflow-auto px-5 "}>
                    < Messages children={[{id: 1, username: "Лох", text: "Как же я заебался"}]}/>
                </div>
                <div className={"mt-auto px-5 py-3"}>
                    < FormSendMsg />
                </div>
            </div>
        </Col>
    )
}