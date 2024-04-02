import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './LoginForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomInput } from '../CustomInput/CustomInput';
import { ButtonC } from '../ButtonC/ButtonC';
import { loginCall } from '../../services/apiCall';
import { decodeToken } from "react-jwt";


export const LoginForm = () => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
      email: "",
      password: "",
    });
  
    const [msg, setMsg] = useState("");
  
    const inputHandler = (e) => {
      //genero la función que bindea
  
      setCredentials((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
  
    const loginMe = async () => {
      //esta será la función que desencadenará el login...
      const answer = await loginCall(credentials);
      
      console.log(answer);
      if (answer.data.token) {
        //decodificamos el token...
        const uDecodificado = decodeToken(answer.data.token);
        console.log(uDecodificado);
  
        const passport = {
          token: answer.data.token,
          decodificado: uDecodificado,
        };
  
        console.log(passport);
        //Guardaríamos passport bien en RDX o session/localStorage si no disponemos del primero
        sessionStorage.setItem("passport", JSON.stringify(passport))
        
        setMsg(`${uDecodificado.name}, bienvenid@ de nuevo.`);
  
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    };
    return (
        <>
        <Container id='LoginForm'>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">

                    <Form.Label>
                        Email address
                    </Form.Label>
                    
                    <CustomInput 
                        nameProp="email"
                        typeProp="email" 
                        placeholderProp="Enter email"
                        handlerProp={(e)=>inputHandler(e)} />
                    
                    <Form.Text 
                        className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                        Password
                    </Form.Label>
                    <CustomInput
                        nameProp="password" 
                        typeProp="Password" 
                        placeholderProp="Enter email"
                        handlerProp={(e)=>inputHandler(e)} />
                </Form.Group>
      
                <Form.Group 
                    className="mb-3" 
                    controlId="formBasicCheckbox">
                    <Form.Check 
                        type="checkbox" 
                        label="Check me out" />
                </Form.Group>
                <ButtonC
                    title={"log me!"}
                    className={"regularButtonClass"}
                    functionEmit={loginMe}
                />
                <pre>{JSON.stringify(credentials, null, 2)}</pre>
            </Form>
        </Container>
        </>
    )
}