import {React, useEffect, useState} from 'react';
import {Container, Row,} from 'react-bootstrap';
import {NavBar} from "../chat_elem/NavBar";
import {Channels} from "../chat_elem/Channels";
import {Chat} from "../chat_elem/Chat";
import {io} from "socket.io-client";
import axios from "axios";
import {LocalRoute} from "../../routes";

const socket = io('')

export const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState(null)
  const [currentNameChannel, setCurrentNameChannel] = useState('')
  useEffect(() => {
    const token = window.localStorage.getItem('token')
    axios.get(LocalRoute.channelsApi, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setChannels([...response.data])
      setCurrentChannel(response.data[0].id)
      setCurrentNameChannel(response.data[0].name)
    });
     axios.get(LocalRoute.messagesApi, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setMessages([...response.data])
    });
  }, [])
  useEffect(() => {
    socket.on('newChannel', (payload) => {
      console.log(payload);
      setChannels([...channels, payload])
    });
    socket.on('newMessage', (payload) => {
      console.log('Новое сообщение')
      console.log(payload);
      setMessages([...messages, payload])
    })
    socket.on('connect', () => {
      console.log('connect')
    })
    socket.on('disconnect', (reason) => {
      if (reason === "io server disconnect") {
        socket.connect();
      }
    })
  }, [socket, messages, channels])
  const callbackSetCurrentChannel = (e) => {
    console.log(e.target.value)
    setCurrentChannel(e.target.value)
    setCurrentNameChannel(channels.filter(channel => channel.id == e.target.value)[0].name)

  }
  return (
      <Container >
          < NavBar />
          <Container className="h-100 my-4 overflow-hidden rounded shadow">
              <Row className={"h-100 bg-white flex-md-row"}>
                < Channels channels={channels} currentChannel={currentChannel} callbackSetCurrentChannel={callbackSetCurrentChannel}/>
                < Chat messages={messages} currentChannel={currentChannel} currentNameChannel={currentNameChannel}/>
              </Row>
          </Container>
      </Container>
  )
};