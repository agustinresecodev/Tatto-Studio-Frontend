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
                                       <div key={element.id}> 
                                       <div>id {element.id}</div>
                                        <div>
                                        artista 
                                            {element.artist.user.firstName} 
                                            {element.artist.user.lastName}
                                            {element.artist.user.phone}
                                            {element.artist.user.email}
                                        </div>
                                        <div>
                                        cliente
                                            {element.client.user.firstName}
                                            {element.client.user.lastName}
                                            {element.client.user.phone}
                                            {element.client.user.email}
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