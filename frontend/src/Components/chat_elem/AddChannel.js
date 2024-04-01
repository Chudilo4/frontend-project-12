import {useFormik} from "formik";
import {Button, Form, Modal} from "react-bootstrap";
import {PlusSquare} from "react-bootstrap-icons";
import React, {useState} from "react";
import {PostChannel} from "../../slices/channels_slice";
import {useDispatch} from "react-redux";


export const AddChannel = (props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        onSubmit: (values) => {
            dispatch(PostChannel(values));
            values.name = ''
            handleClose()
        }
    })
    return (
        <>
            <Button type="button" variant="group-vertical" className="p-0 text-primary" onClick={handleShow}>
                <PlusSquare size={20} />
                <span className="visually-hidden">+</span>
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
                <Modal.Header closeButton>
                    <Modal.Title>Добавьте канал</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <Form.Group className={"input-group has-validation"}>
                            <Form.Control
                              className="border-0 p-0 ps-2 form-control"
                              onChange={formik.handleChange}
                              value={formik.values.name}
                              aria-label={"Новое сообщение"}
                              type="text"
                              placeholder="Введите наименование канала ..."
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
        </>
    )
}
