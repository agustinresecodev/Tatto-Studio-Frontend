import './LoginForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonC } from '../ButtonC/ButtonC';
import { loginCall } from '../../services/apiCall';
import { decodeToken } from "react-jwt";
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../Slicers/userSlicer';



export const LoginForm = () => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
      email: "",
      password: "",
    });
  
    const dispatch = useDispatch();
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
      
      //console.log(answer);
      if (answer.data.token) {
        //decodificamos el token...
        const uDecodificado = decodeToken(answer.data.token);
        console.log(uDecodificado);
  
        const passport = {
          token: answer.data.token,
          decodificado: uDecodificado,
        };
  
        //llamamos al almacen de Redux dandole la instruccion de que realice un login con nuestro passport
        //dentro de la funcion "login" de userSlice, ese passport se recibe a traves del action.payload
        dispatch(login(passport));


        //Guardaríamos passport bien en RDX o session/localStorage si no disponemos del primero
        //sessionStorage.setItem("passport", JSON.stringify(passport))
        
        setMsg(`${uDecodificado.name}, bienvenid@ de nuevo.`);
  
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    };
    return (
        <>
          <div className="container" id="RegisterFormDiv">
            <div className="row">
                <div className="col-md-12">
                    <h2>Login</h2>
                    <form >
                        
                        
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" name="email" onChange={inputHandler}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" onChange={inputHandler}/>
                        </div>
                        
                        <ButtonC
                            title={"Login"}
                            className={"regularButtonClass"}
                            functionEmit={loginMe}
                        />
                    </form>
                </div>
            </div>
            

            
          </div>
        </>
    )
}