import React from 'react';
import {Container, Row,} from 'react-bootstrap';
import {NavBar} from "../chat_elem/NavBar";
import {Channels} from "../chat_elem/Channels";
import {Chat} from "../chat_elem/Chat";


export const ChatPage = () => {
  return (
      <Container >
          < NavBar />
          <Container className="h-100 my-4 overflow-hidden rounded shadow">
              <Row className={"h-100 bg-white flex-md-row"}>
                < Channels />
                < Chat />
              </Row>
          </Container>
      </Container>
  )
};