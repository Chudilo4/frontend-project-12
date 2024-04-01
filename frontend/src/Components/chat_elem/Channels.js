import {Button, ButtonGroup, Col, Dropdown, Form, Modal} from "react-bootstrap";
import React, {useState} from "react";
import {AddChannel} from "./AddChannel";
import Nav from 'react-bootstrap/Nav';
import {useFormik} from "formik";
import axios from "axios";
import {LocalRoute} from "../../routes";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentChannel} from "../../slices/CurrentChannelSlice";


export const Channels = (props) => {
  const [showModalUpdateChannel, setShowUpdateChannel] = useState(false);
  const dispatch = useDispatch();
  const stateChannel = useSelector((state) => state.currentChannel);
  const handleClose = () => setShowUpdateChannel(false);
  const handleOpen = () => setShowUpdateChannel(true);
  const formik = useFormik({
    initialValues: {
        name: '',
    },
    onSubmit: (values) => {
        const channelId = props.currentChannel;
        const token = window.localStorage.getItem('token')
        const editedChannel = { name: values.name };
        axios.patch(`${LocalRoute.channelsApiDetail}${channelId}`, editedChannel, {
          headers: {
            Authorization: `Bearer ${token}`,
          },

        })
        values.name = ''
        handleClose()
    }
    })
    return (
        <Col className="col-4 border-end pt-5 px-0 bg-light" md="2">
            <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
                <b>Каналы</b>
                <AddChannel />
            </div>
            <Nav fill variant="pills" as="ul" className="flex-column px-2">
                {props.channels.map((channel) =>
              <Nav.Item key={channel.id} className="w-100">
                <Dropdown as={ButtonGroup} className="d-flex rounded-0">
                  <Button variant="success" className="w-100 rounded-0 text-start text-truncate" value={channel.id} onClick={dispatch(setCurrentChannel(stateChannel, {id: channel.id, name: channel.name}))}>
                    # {channel.name}
                  </Button>
                  <Dropdown.Toggle variant="success" >
                    <span className="visually-hidden"></span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleOpen}>
                      {'Редактировать'}
                    </Dropdown.Item>
                    <Modal show={showModalUpdateChannel} onHide={handleClose}>
                      <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
                      <Modal.Header closeButton>
                          <Modal.Title>Изменить наименование канала</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                              <Form.Group className={"input-group has-validation"}>
                                  <Form.Control
                                    className="border-0 p-0 ps-2 form-control"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    aria-label={"Новое наименование канала"}
                                    type="text"
                                    placeholder="Введите новое наименование канала ..."
                                    id="name"
                                    name="name"
                                    required={true}
                                  />
                              </Form.Group>
                      </Modal.Body>
                      <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                              Отменить
                          </Button>
                          <Button variant="primary" type="submit">
                              Отправить
                          </Button>
                      </Modal.Footer>
                      </Form>
                    </Modal>
                    <Dropdown.Item
                    >
                      {'Удалить'}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Item>
                )}
            </Nav>
        </Col>
    )
}