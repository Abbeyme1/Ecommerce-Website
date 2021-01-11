import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message/Message";
import Loader from "../components/Loader/Loader";
import FormContainer from "../components/FormContainer/FormContainer";
import { userLogin } from "../actions/actions";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = user;

  useEffect(() => {
    // here its redirecting to shopping after we checkout
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const sumbitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin(email, password));
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={sumbitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email ? email : ""}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password ? password : ""}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button type="sumbit" variant="primary">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer ?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
