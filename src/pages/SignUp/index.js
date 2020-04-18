import React, { useState } from 'react';
import Logo from '../../assets/logo.png';
import { Form } from 'react-bootstrap';
import { login } from "../../services/auth";
import api from "../../services/api";
import { useHistory, withRouter } from 'react-router-dom';


function Login () {

  let history = useHistory();

  const [error, setError] = useState("");

  function useInput ({ type }) {
    const [value, setValue] = useState("");
    const input = <Form.Control value={value} onChange={e => setValue(e.target.value)} type={type} />;
    return [value, input];
  }

  const [username, userInput] = useInput({ type: "text" });
  const [passwordd, passwordInput] = useInput({ type: "password" });

  async function validCredencials (e) {

    e.preventDefault();

    if (!username || !passwordd) {
      setError("Preencha e-mail e senha para continuar");
    } else {

      try {

        const response = await api.post('/login', {
          email: username,
          password: passwordd
        });

        login(response.data.token);

        history.push("/app");

      } catch (error) {
        setError(error.response.data.error);
      }

    }

  }

  return (
    <>
      <div className="box ">

        <Form onSubmit={validCredencials}>

          <div className="item p-5">



            <div className="text-center">
              <img src={Logo} alt="O Melhor assento da casa" title="O Melhor assento da casa" /> <br />
              {error}
            </div>

            <Form.Group className="mt-5" controlId="exampleForm.ControlInput1">
              <Form.Label>Login</Form.Label>
              {userInput}
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="my-4">
              <Form.Label>Password</Form.Label>
              {passwordInput}
            </Form.Group>


            <div className="text-center pt-2">

              <button type="submit" className="rounded-pill btn py-2 px-5 text-white">Finalizar Compra</button>


              <div className="mt-4">
                <div className="mb-3">
                  <a className="color-blue" href="#teste">Esqueci minha senha</a> <br />
                </div>
                <a className="color-blue" href="#teste">Ainda não tenho uma conta</a>
              </div>
            </div>

          </div>

        </Form>
      </div>


    </>
  );
}


export default withRouter(Login);