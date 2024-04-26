import { useSelector } from "react-redux";
import { getUserData } from "../../components/Slicers/userSlicer";

import { useNavigate } from "react-router-dom";
import "./AdminPage.css";


import { Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { bringAllAppointmentsCall } from "../../services/apiCall";

export const AdminPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [totalAppointments, setTotalAppointments] = useState([]);
    const userData = useSelector(getUserData);

    useEffect(() => {
        setTimeout(() => {
        const fetchAppointment = async () =>{ 
            
        const response = await bringAllAppointmentsCall(userData.token)
        console.log(response.data);
        setAppointments(response.data[0]);
        setTotalAppointments(response.data[1]);
        
    };
    
    fetchAppointment();
    
    
}, 3000);

    },[]) 

    

    if(userData.token === "" || userData.decodificado.userRole !== "admin"){
        return <Navigate to="/login" />
    }else{
        return(
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 sectionContainer" >
                            <h1>Algo meteremos</h1>
                        </div>
                        <div className="col-md-6 sectionContainer">
                            <h2>Administrar usuarios
                            </h2>
                            <Button href="/admin/users"></Button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-11 sectionContainer" >
                            ultimas fechas
                            
                                {appointments.map((element) => {
                                    return(
                                       <div key={element.id} className="sectionContainer"> 
                                       <div>id {element.id}</div>
                                       
                                        <div className="col-12 sectionContainer">
                                            <div className="row">
                                            <h4>Artista </h4>
                                            </div>
                                            <div className="row">
                                                <div className="col-3">
                                                    <label>Nombre: </label>
                                                    {element.artist.user.firstName}
                                                </div>
                                                <div className="col-3">
                                                    <label>Apellido:  </label> 
                                                    {element.artist.user.lastName}
                                                </div>
                                                <div className="col-3">
                                                    <label>Telefono: </label>
                                                    {element.artist.user.phone}
                                                </div>
                                                <div className="col-12 col-3">
                                                    <label>Email: </label>
                                                    {element.artist.user.email}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 sectionContainer">
                                            <div className="row">
                                                <h4>Cliente</h4>    
                                            </div>
                                            <div className="row">
                                                <div className="col-3">Nombre: {element.client.user.firstName}</div>
                                                <div className="col-3">Apellido: {element.client.user.lastName}</div>
                                                <div className="col-3">Telefono: {element.client.user.phone}</div>
                                                <div className="col-12">Email: {element.client.user.email}</div> 
                                            </div>
                                                                                                                                                                               
                                        </div>
                                        <div>
                                            fecha
                                            {element.day_date}
                                        </div>

                                        <div>
                                            descriptio
                                            {element.description}
                                        </div>
                                        <div>
                                            precio
                                            {element.price}
                                        </div>
                                    </div>
                                    )
                                })}
                            
                        </div>
                    </div>
                </div>
            </>
        )
    }

    
}

export default AdminPage;