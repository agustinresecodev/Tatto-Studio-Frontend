import { useSelector } from "react-redux";
import { getUserData } from "../../components/Slicers/userSlicer";

import { useNavigate } from "react-router-dom";
import "./AdminPage.css";


import { Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";

export const AdminPage = () => {
    const navigate = useNavigate();
   
    const userData = useSelector(getUserData);

    const administrateUsersHandler = () => {
        
        return navigate("/admin/users")
    }
    
    
    if(userData.token === "" || userData.decodificado.userRole !== "admin"){
        return <Navigate to="/login" />
    }else{
        return(
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 sectionContainer" >
                            <h1>Ultimas citas</h1>
                        </div>
                        <div className="col-md-5 sectionContainer">
                            <h2>Administrar usuarios
                            </h2>
                            <Button href="/admin/users"></Button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    
}

export default AdminPage;