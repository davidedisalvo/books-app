import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../shared/context/auth-context";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

const Example = (props) => {
  const auth = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [image, setImage] = useState();
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = (values) => {
    if (isLoginMode) {
    } else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/users/signup`,
        data: {
          name: values.name,
          password: values.password,
          email: values.email,
        },
      }).then((response) => {
        props.history.push(`/${response.data.user.id}`);
        auth.setUserId(response.data.user.id);
        auth.login();
      });
    }
  };
  const signUp = () => {
    setIsLoginMode(false);
  };
  const login = () => {
    setIsLoginMode(true);
  };
  //   const handleEmail = (event) => {
  //     console.log(event.target.value);
  //     const email = event.target.value;
  //     setEmail(email);
  //   };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={9} xs={12}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {!isLoginMode && (
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  ref={register({
                    required: "Required",
                  })}
                />
                {errors.name && errors.name.message}
              </Form.Group>
            )}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>

              <Form.Control
                name="email"
                ref={register({
                  required: "Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "invalid email address",
                  },
                })}
              />
              {errors.email && errors.email.message}
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                ref={register({
                  required: "Required",
                  minLength: {
                    value: 5,
                    message: "Password must contain at least 5 character",
                  },
                })}
              />
              {errors.password && errors.password.message}
            </Form.Group>
            {!isLoginMode && (
              <Form.Group>
                <Form.File
                  id="exampleFormControlFile1"
                  label="Choose your image profile"
                />
              </Form.Group>
            )}

            <Button variant="primary" type="submit">
              {isLoginMode ? "Login" : "Signup"}
            </Button>
          </Form>
          {isLoginMode ? (
            <h5 onClick={signUp}>Create an account</h5>
          ) : (
            <h5 onClick={login}>Do you already have an account? Plese login</h5>
          )}
        </Col>
      </Row>
    </Container>
  );
};
export default Example;
