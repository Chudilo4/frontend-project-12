import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Form,
    Row
} from 'react-bootstrap';
import {useFormik} from 'formik';
import loginAvatar from '../../images/login.jpeg';
import React from "react";
import {useNavigate} from "react-router-dom";
import route from '../../routes'
import axios from "axios";


export const LoginPage = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: (values) => {
            axios.post(route.loginApi, {username: values.username, password: values.password})
                .then((response) =>  {
                    if (response.status === 200) {
                        const token = response.data.token
                        const username = response.data.username
                        window.localStorage.setItem('token', token)
                        window.localStorage.setItem('username', username)
                        navigate('/')
                    }
                })
        }
    });
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