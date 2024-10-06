import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom"; // Importamos NavLink desde react-router-dom

import "./Header.css";

function BasicExample() {
  return (
    <Navbar expand="lg" className="header">
      <Container>
        <h1 className="nav-title">Montruck</h1>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="pages">
            {/* Usamos NavLink para evitar recargar la página */}
            <NavLink to="/Dashboard" className="nav-link">
              Dashboard
            </NavLink>
            <NavLink to="/Graficas" className="nav-link">
              Gráficas
            </NavLink>
            <NavLink to="/Reportes" className="nav-link">
              Reportes
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
