import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavComponent = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container className="justify-content-between">
        <Navbar.Brand>Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav.Link className="me-auto my-2 my-lg-0 text-white"  href="/dataTbale">Dashboard</Nav.Link>
          <Nav className="me-auto my-2 my-lg-0 text-white ">Login</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavComponent;
