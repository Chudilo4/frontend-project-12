import {React, useEffect} from 'react';
import {Container, Row,} from 'react-bootstrap';
import {NavBar} from "../chat_elem/NavBar";
import {Channels} from "../chat_elem/Channels";
import {Chat} from "../chat_elem/Chat";
import {io} from "socket.io-client";
import {
  addChannel,
  GetChannels,
  selectorsChannels, updateChannel
} from '../../slices/channels_slice';
import {useDispatch, useSelector} from "react-redux";
import {
  addMessage,
  GetMessages,
  selectorsMessages
} from "../../slices/message_slice";

const socket = io('')

export const ChatPage = () => {
  const dispatch = useDispatch();
  const channels = useSelector(selectorsChannels.selectAll);
  const messages = useSelector(selectorsMessages.selectAll);
  const currentChannel = useSelector((state) => state.currentChannel);
  useEffect(() => {
    dispatch(GetChannels());
    dispatch(GetMessages());
    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload))
      console.log(currentChannel)
    });
    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload))
    })
    socket.on('connect', () => {
      console.log('connect')
    })
    socket.on('disconnect', (reason) => {
      if (reason === "io server disconnect") {
        socket.connect();
      }
    })
    socket.on('renameChannel', (payload) => {
      dispatch(updateChannel({ id: payload.id, changes: payload }))
    });
  }, [messages, channels, dispatch, currentChannel])
  return (
      <Container >
          < NavBar />
          <Container className="h-100 my-4 overflow-hidden rounded shadow">
              <Row className="h-100 bg-white flex-md-row">
                < Channels channels={channels} currentChannel={currentChannel}/>
                < Chat messages={messages} currentChannel={currentChannel}/>
              </Row>
          </Container>
      </Container>
  )
};