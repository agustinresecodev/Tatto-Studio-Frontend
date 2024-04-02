import { registerNewUserCall } from "../../services/apiCall";
import { useState } from "react";
import "./RegisterForm.css";
import { useNavigate } from "react-router-dom";
import { ButtonC } from "../ButtonC/ButtonC";



export const RegisterForm = () => { 
    const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    name: "",
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

  const registerMe = async () => {
    const answer = await registerNewUserCall(credentials);

    console.log(answer);

    if(answer.status === 201){
        setTimeout(()=> {
            navigate("/login")
        }, 3000)
    }
  };

   


   


    return(
        <div className="container" id="RegisterFormDiv">
            <div className="row">
                <div className="col-md-12">
                    <h2>Register</h2>
                    <form >
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" className="form-control" name="firstName" onChange={inputHandler}/>
                        </div>
                        
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" name="email" onChange={inputHandler}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" onChange={inputHandler}/>
                        </div>
                        
                        <ButtonC
                            title={"register!"}
                            className={"regularButtonClass"}
                            functionEmit={registerMe}
                        />
                    </form>
                </div>
            </div>
            <div className="row">
                Already registered? Then <a href="/login">Login </a>
            </div>

            
        </div>
    )
}

export default RegisterForm;