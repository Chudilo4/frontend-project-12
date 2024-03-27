import {Button, Container, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import route from "../../routes";
import Nav from "react-bootstrap/Nav";
import React from "react";
import {useFormik} from "formik";


export const NavBar = () => {
  const navigate = useNavigate();
  const formikExit = useFormik({
      initialValues: {},
      onSubmit: () => {
          window.localStorage.removeItem('token');
          navigate('/login')
        }
    });
    return (
        <Nav className={"shadow-sm navbar navbar-expand-lg navbar-light bg-white"}>
          <Container>
              <Link to={route.root}>Chat</Link>
              <Form onSubmit={formikExit.handleSubmit}>
                  <Button type="submit" className={"btn btn-primary"} >
                  Выйти
              </Button>
              </Form>
          </Container>
          </Nav>
    )
}