import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';

const NavbarTest = () => {
  return (
    <Navbar expand="lg" bg='dark' data-bs-theme='dark' className="bg-body-tertiary align-content-begin">
      <Container>
        <Navbar.Brand href="/">Tattoo Studio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/appointments">Appointments</Nav.Link>
            <NavDropdown title="Session" id="basic-nav-dropdown">
              <NavDropdown.Item href="/login">LogIn</NavDropdown.Item>
              <NavDropdown.Item href="/register">
                Register
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}

export default NavbarTest;