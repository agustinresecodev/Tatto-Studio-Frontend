import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Navbar.css";

import { useSelector, useDispatch } from 'react-redux';
import userSlicer from '../Slicers/userSlicer';
import { logout, getUserData } from '../Slicers/userSlicer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const NavbarTest = () => {

  //INSTANCIA DE REDUX EN MODO LECTURA
  const userData = useSelector(getUserData);
  
  //INSTANCIA DE REDUX EN MODO ESCRITURA
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(userData,"soy el slice de user")
  },[userData])

  //instanciamos el hook de navegación
  const navigate = useNavigate();

  const userName = userData.decodificado.userName;
  console.log(userName)
  //funcion logout
  const logoutUser = () => {
    dispatch(logout())
    //navigate("/");
  }

  return (
    <Navbar expand="lg" bg='dark' data-bs-theme='dark' className="bg-body-tertiary align-content-begin">
      <Container>
        <Navbar.Brand href="/">Tattoo Studio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/artists">Artists</Nav.Link>
           
              
                {userData.token === "" ?(
                  <>
                    <Nav.Link href="/login">LogIn</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                  </>              
                ):(<>
                  <Nav.Link href="/profile">Profile</Nav.Link>
                  <Nav.Link href="/appointments">Appointments</Nav.Link>
                  <NavDropdown title={userData.decodificado.userName} id="basic-nav-dropdown">                  
                    <NavDropdown.Item onClick={()=>logoutUser()}>LogOut</NavDropdown.Item>
                  </NavDropdown>
                  </>  
                )}
                
              


              
              
          
            
           
            

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}

export default NavbarTest;