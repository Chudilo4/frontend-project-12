import {
    Container, Col, Card, Row, CardBody, Button, Form
} from 'react-bootstrap';
 import { useFormik} from 'formik';
import loginAvatar from '../../images/login.jpeg';
import React  from "react";
import {fetchAuth} from "../../slices/auth_slice";
import {useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import route from '../../routes'


export const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values) => {
            const token = window.localStorage.getItem('token');
            if (!token) {
                dispatch(fetchAuth(values))
            } else {
                navigate(route.root)
            }
        }
    })
  return (
      <Container fluid className="h-100">
        <Row className="justify-content-center align-content-center h-100">
          <Col md={8} xxl={6} className="col-12">
            <Card className="shadow-sm">
              <CardBody className="row p-5">
                <Col className="d-flex align-items-center justify-content-center" md={6} >
                  <img src={loginAvatar} className="rounded-circle" alt="Войти"/>
                </Col>
                <Form onSubmit={formik.handleSubmit} className="p-3">
                  <fieldset>
                      <Form.Group>
                        <Form.Label htmlFor="username">Username</Form.Label>
                        <Form.Control
                          onChange={formik.handleChange}
                          value={formik.values.username}
                          placeholder="username"
                          name="username"
                          id="username"
                          autoComplete="username"
                          required
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control
                          type="password"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          placeholder="password"
                          name="password"
                          id="password"
                          autoComplete="current-password"
                          required
                        />
                        <Form.Control.Feedback type="invalid">the username or password is incorrect</Form.Control.Feedback>
                      </Form.Group>
                      <Button type="submit" variant="outline-primary">Submit</Button>
                  </fieldset>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
  )
};