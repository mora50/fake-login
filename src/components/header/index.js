import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import Logo from "../../assets/logo.png";
import { logout } from "../../services/auth";

export default function Header() {
  return (
    <>
      <Navbar expand="lg" className="shadow py-0">
        <Container>
          <div className="shadow bg-white mb-lg-n5 d-flex align-items-center py-lg-4 py-3 px-4">
            <img
              src={Logo}
              alt="O Melhor assento da casa"
              title="O Melhor assento da casa"
            />
            <Nav>
              <div className="color-blue ml-4" href="#home">
                Loja
              </div>
            </Nav>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end align-items-center pb-4"
          >
            <Nav className="mt-4">
              <a className="color-blue" onClick={logout} href="/">
                Logout
              </a>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
