import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  CardBody,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import { useFormik } from "formik";
import { EcpApiMethod } from "../../common/enums/EcpApiMethod";
import { ILoginParams } from "../../models/authorisation/ILoginParams";
import { login } from "../../authorisation/auth";
import useApiRequest from "../../hooks/useApiRequest";
import AlertMessage from "../../common/components/AlertMessage";
import logo from "../../assets/logo.png";
import Spinner from "../../common/components/Spinner";
import * as Yup from "yup";
import * as api from "../../app-config/api-urls";

const Login = () => {
  let history = useHistory();
  const { apiRequest } = useApiRequest();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validationSchema = Yup.object({
    username: Yup.string().required("The Email Address is required").email("The Email Address is invalid"),
    password: Yup.string().nullable().required("Password is required"),
  });

  const { handleSubmit, handleChange, touched, values, errors } = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema,
    onSubmit(values) {
      (async () => {
        try {
          setError(false);
          setLoading(true);
          setErrorMessage("");
          const data: ILoginParams = { username: values.username, password: values.password };

          await apiRequest(EcpApiMethod.POST, api.authorise, data).then((token) => {
            login(token);
            history.push("/home");
          });
          setLoading(false);
        } catch (error) {
          setError(true);
          setLoading(false);
          setErrorMessage("The username or the password is not correct");
        }
      })();
    },
  });

  return (
    <div className="app flex-row align-items-center animated fadeIn">
      <Spinner display={loading}></Spinner>
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form action="" method="post" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-envelope"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        value={values.username}
                        placeholder="Email Address"
                        className={!touched.username ? "null" : errors.username ? "is-invalid" : "is-valid"}
                      />
                      <FormFeedback>{errors.username ? errors.username : null}</FormFeedback>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                        placeholder="Password"
                        className={!touched.password ? "null" : errors.password ? "is-invalid" : "is-valid"}
                      />
                      <FormFeedback>{errors.password ? errors.password : null}</FormFeedback>
                    </InputGroup>
                    <Row>
                      <Col xs="5">
                        <Button color="primary" type="submit" className="px-4" disabled={loading}>
                          Login
                        </Button>
                      </Col>
                      {/* <Col xs="7" className="text-right">
                        <Link to="/password-reset">Forgot password?</Link>
                      </Col> */}
                    </Row>
                  </Form>

                  <br></br>
                  {(error || errorMessage !== "") && <AlertMessage color="danger" message={errorMessage}></AlertMessage>}
                </CardBody>
              </Card>
              <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: "44%" }}>
                <CardBody className="text-center">
                  <div>
                    <img src={logo} alt="logo" style={{ marginTop: "40px" }} />
                  </div>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
