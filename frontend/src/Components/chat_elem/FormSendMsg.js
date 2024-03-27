import {Button, Form} from "react-bootstrap";
import {ArrowBarRight} from "react-bootstrap-icons";
import React from "react";
import {useFormik} from "formik";
import axios from "axios";
import route from '../../routes'


export const FormSendMsg = (props) => {
    const {channelId} = props
    const formik = useFormik({
        initialValues: {
            text: '',
        },
        onSubmit: async (values) => {
            const username = window.localStorage.getItem('username')
            const token = window.localStorage.getItem('token')
            const newMessage = { body: values.text, channelId: channelId, username: username };
            axios.post(route.messagesApi, newMessage, {headers: {Authorization: `Bearer ${token}`}})
            values.text = ''
        }
    })
    return (
        <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2" noValidate={true}>
            <fieldset>
                <Form.Group className={"input-group has-validation"}>
                    <Form.Control
                      className="border-0 p-0 ps-2 form-control"
                      onChange={formik.handleChange}
                      value={formik.values.text}
                      aria-label={"Новое сообщение"}
                      type="email"
                      placeholder="Введите сообщение..."
                      id="text"
                      name="text"
                    />
                    <Button variant="primary" type="submit" className="btn btn-group-vertical">
                        <ArrowBarRight size={20}>
                          <span className="visually-hidden">Отправить</span>
                        </ArrowBarRight>
                    </Button>
                </Form.Group>
            </fieldset>
        </Form>
    )
}
