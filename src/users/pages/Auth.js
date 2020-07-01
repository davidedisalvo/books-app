import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../shared/context/auth-context";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import "./Auth.scss";

const Auth = (props) => {
  const auth = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [bio, setBio] = useState();
  const [error, setError] = useState(false);
  const [image, setImage] = useState(
    "https://colewest.com/wp-content/uploads/2016/12/user-placeholder.jpg"
  );

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { handleSubmit, register, errors } = useForm();

  const onSubmit = (values) => {
    if (isLoginMode) {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/users/login`,
        data: {
          password: values.password,
          email: values.email,
        },
      })
        .then((response) => {
          props.history.push(`/${response.data.userId}`);
          //send token to general state
          auth.login(
            response.data.userId,
            response.data.token,
            response.data.name
          );
          //send login to general state
          auth.isLoggedIn(true);
          if (response.message) {
          }
        })
        .catch((err) => {
          setError(true);
        });
    } else {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("bio", values.bio);
      formData.append("image", image);
      if (!values.image) {
        //if user select no image use placeholder
        values.image =
          "https://colewest.com/wp-content/uploads/2016/12/user-placeholder.jpg";
      }
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/users/signup`,
        data: formData,
        // headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          //redirect user to his profile
          props.history.push(`/${response.data.userId}`);
          //send user data to general state
          auth.login(
            response.data.userId,
            response.data.token,
            response.data.name
          );
          //set login mode
          auth.isLoggedIn(true);

          if (!response) {
            return;
          }
        })
        .catch((error) => {
          setError(true);
        });
    }
  };

  const imageHandle = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const signUp = () => {
    setIsLoginMode(false);
  };
  const login = () => {
    setIsLoginMode(true);
  };

  return (
    <Container className="auth">
      <div className="main-title">
        <h1>Login required</h1>
      </div>
      <Row className="justify-content-center">
        <Col
          xs={12}
          sm={{ span: 6 }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <lottie-player
            src="https://assets1.lottiefiles.com/private_files/lf30_bcVsEA.json"
            background="transparent"
            speed="1"
            style={{ width: "300px", height: "200px" }}
            loop
            autoplay
          ></lottie-player>
        </Col>
        <Col sm={9} xs={12}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {!isLoginMode && (
              <>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    ref={register({
                      required: "The field is required",
                    })}
                  />
                  <p className="error">{errors.name && errors.name.message}</p>
                </Form.Group>
                <Form.Group controlId="formBasicBio">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    name="bio"
                    ref={register({
                      required: "The field is required",
                      minLength: {
                        value: 40,
                        message: "Password must contain at least 40 character",
                      },
                      maxLength: {
                        value: 80,
                        message: "Password must contain maximum 80 character",
                      },
                    })}
                  />
                  <p className="error">{errors.bio && errors.bio.message}</p>
                </Form.Group>
              </>
            )}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>

              <Form.Control
                name="email"
                ref={register({
                  required: "The field is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <p className="error">{errors.email && errors.email.message}</p>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                ref={register({
                  required: "The field is required",
                  minLength: {
                    value: 5,
                    message: "Password must contain at least 5 character",
                  },
                })}
              />
              <p className="error">
                {errors.password && errors.password.message}
              </p>
            </Form.Group>
            {!isLoginMode && (
              <Form.Group>
                <Form.File
                  id="exampleFormControlFile1"
                  name="image"
                  label="Choose your image profile"
                  ref={register({
                    required: "The field is required",
                  })}
                  onChange={imageHandle}
                />
                <p className="error">{errors.image && errors.image.message}</p>
              </Form.Group>
            )}

            <Button variant="outline-light cta" type="submit">
              {isLoginMode ? "Login" : "Signup"}
            </Button>
          </Form>
          {isLoginMode ? (
            <p className="switch" onClick={signUp}>
              Not a user? Create an account
            </p>
          ) : (
            <p className="switch" onClick={login}>
              Do you already have an account? Plese login
            </p>
          )}
          {error && (
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                Your credential are invalid. Please try again.
              </Modal.Body>
              <Modal.Footer>
                <a
                  class="cta"
                  style={{
                    cursor: "pointer",
                    background: "#009FB7",
                    color: "#EFF1F3",
                  }}
                  onClick={handleClose}
                >
                  Close
                </a>
              </Modal.Footer>
            </Modal>
          )}
        </Col>
      </Row>
    </Container>
  );
};
export default Auth;