import React, {useEffect} from 'react';
import Nav from 'react-bootstrap/Nav';
import {
    Container, Col, Card, Row, CardBody, Button, Form,
} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import {Link} from "react-router-dom";
import route from '../../routes'
import {useDispatch, useSelector} from 'react-redux';
import {fetchData} from "../../slices/channels_slice";
import { PlusSquare, ArrowBarRight} from 'react-bootstrap-icons';
import { selectors } from '../../slices/channels_slice';


export const ChatPage = () => {
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch, ]);
  const channelsState = useSelector(selectors.selectAll);
  return (
      <Container >
          <Nav className={"shadow-sm navbar navbar-expand-lg navbar-light bg-white"}>
          <Container>
              <Link to={route.root}>Chat</Link>
              <Button type={"button"} className={"btn btn-primary"}>
                  Выйти
              </Button>
          </Container>
          </Nav>
          <Container className="h-100 my-4 overflow-hidden rounded shadow">
              <Row className={"h-100 bg-white flex-md-row"}>
                <Col className={"col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex"}>
                    <div className={"d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4"}>
                        <b>Каналы</b>
                        <Button type="button" variant="group-vertical" className="p-0 text-primary">
                          <PlusSquare size={20} />
                          <span className="visually-hidden">+</span>
                        </Button>
                    </div>
                    <ListGroup as={'ul'}>
                        {channelsState.map((channel) => (<ListGroup.Item as="li" key={channel.id}>{channel.name}</ListGroup.Item>))}
                    </ListGroup>
                </Col>
                <Col className={"col p-0 h-100"}>
                    <div className={"d-flex flex-column h-100"}>
                        <div className={'bg-light mb-4 p-3 shadow-sm small'}>
                            <p className="m-0">
                                <b># general</b>
                            </p>
                        </div>
                        <div className={"chat-messages overflow-auto px-5 "}>
                            <div className="text-break mb-2">
                                <b>admin</b>: ыуа
                            </div>
                        </div>
                        <div className={"mt-auto px-5 py-3"}>
                            <Form className={"py-1 border rounded-2"} noValidate={true}>
                              <Form.Group className={"input-group has-validation"}>
                                <Form.Control type="email" placeholder="Введите сообщение..." name={"body"} aria-label={"Новое сообщение"} className="border-0 p-0 ps-2 form-control" value=""/>
                                <Button variant="primary" type="submit" disabled={true} className="btn btn-group-vertical">
                                    <ArrowBarRight size={20}>
                                        <span className="visually-hidden">Отправить</span>
                                    </ArrowBarRight>
                              </Button>
                              </Form.Group>
                            </Form>
                        </div>
                    </div>
                </Col>
              </Row>
          </Container>
      </Container>
  )
};