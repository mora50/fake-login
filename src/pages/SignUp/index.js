import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import { Form } from "react-bootstrap";
import { login } from "../../services/auth";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import { Container, BoxLogin, StyledLink, ButtonBlue } from "./style";

export default function Login() {
  const history = useHistory();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function useInput({ type }) {
    const [value, setValue] = useState("");
    const input = (
      <Form.Control
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
      />
    );
    return [value, input];
  }

  const [username, userInput] = useInput({ type: "text" });
  const [passwordd, passwordInput] = useInput({ type: "password" });

  async function validCredencials(e) {
    setLoading(true);

    e.preventDefault();

    if (!username || !passwordd) {
      setError("Preencha login e password para continuar");
      setLoading(false);
    } else {
      await api
        .post("/login", {
          email: username,
          password: passwordd,
        })
        .then(function (response) {
          login(response.data.token);

          setLoading(false);

          history.push("/app");
        })
        .catch(function (error) {
          setError(error.response.data.error);
        })
        .then(function () {
          setLoading(false);
        });
    }
  }

  return (
    <>
      <Container>
        <BoxLogin>
          <Form onSubmit={validCredencials}>
            <div className="item p-5">
              <div className="text-center">
                <img
                  src={Logo}
                  alt="O Melhor assento da casa"
                  title="O Melhor assento da casa"
                />
              </div>

              <h4 className="text-center text-uppercase my-3">{error}</h4>

              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Login</Form.Label>
                {userInput}
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="my-4">
                <Form.Label>Password</Form.Label>
                {passwordInput}
              </Form.Group>

              <div className="text-center pt-2">
                <ButtonBlue type="submit" className="rounded-pill py-3 px-5">
                  Finalizar Compra
                </ButtonBlue>

                {loading && <div>Logando... </div>}

                <div className="mt-4">
                  <div className="mb-3">
                    <StyledLink href="#">Esqueci minha senha</StyledLink>
                  </div>

                  <StyledLink href="#">Ainda não tenho uma conta</StyledLink>
                </div>
              </div>
            </div>
          </Form>
        </BoxLogin>
      </Container>
    </>
  );
}
