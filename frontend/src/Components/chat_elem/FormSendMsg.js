import {Button, Form} from "react-bootstrap";
import {ArrowBarRight} from "react-bootstrap-icons";
import React from "react";
import {useFormik} from "formik";
import {PostMessage} from "../../slices/message_slice";
import {useDispatch} from "react-redux";


export const FormSendMsg = (props) => {
    const { currentChannel } = props;
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            text: '',
        },
        onSubmit: async (values) => {
            const data = {...values, currentChannel: currentChannel}
            dispatch(PostMessage(data));
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
                      type="text"
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
