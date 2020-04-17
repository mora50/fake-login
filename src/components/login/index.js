import React, { useState } from 'react';
import './style.css';
import Logo from '../../assets/logo.png';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Login () {

  function useInput ({ type }) {
    const [value, setValue] = useState("");
    const input = <Form.Control value={value} onChange={e => setValue(e.target.value)} type={type} />;
    return [value, input];
  }
  const [username, userInput] = useInput({ type: "text" });
  const [passwordd, passwordInput] = useInput({ type: "password" });

  async function validCredencials (email, password) {

    try {


      const response = await axios.post('https://reqres.in/api/login', {
        email: email,
        password: password
      });


      localStorage.setItem('token', response.data.token);

    } catch (error) {
      alert(error.response.data.error);
    }
  }



  return (
    <>
      <div className="box ">

        <div className="item p-5">

          <div className="text-center">
            <img src={Logo} alt="O Melhor assento da casa" title="O Melhor assento da casa" />
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
            <Link to="/app">
              <button onClick={() => validCredencials(username, passwordd)} className="rounded-pill btn py-2 px-5 text-white">Finalizar Compra</button>
            </Link>
            <div className="mt-4">
              <div className="mb-3">
                <a className="color-blue" href="#teste">Esqueci minha senha</a> <br />
              </div>
              <a className="color-blue" href="#teste">Ainda não tenho uma conta</a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}