
import { bringMyAppointmentsCall } from "../../../services/apiCall";
import { useEffect, useState } from "react";
import "./Jobdates.css";
import { useSelector } from "react-redux";
import { getUserData } from "../../../components/Slicers/userSlicer";
import { useNavigate } from "react-router-dom";

export const UserJobdates = () =>{

    const myPassport = JSON.parse(sessionStorage.getItem('passport'));

    const [jobdates, setJobdates] = useState([]);

     //leemos el estado de userSlice
    const userData = useSelector(getUserData)
    
    useEffect(()=>{
        setTimeout(() => {
        const fetchJobdates = async () => {
            const response = await bringMyAppointmentsCall(userData.token);
            setJobdates(response.data)
            
        }
        fetchJobdates()
        console.log(jobdates);
    },3000);
    
    
},[])



 //instanciamos el hook de navegación
 const navigate = useNavigate();


    
 
 //si el token está vacío, redirigimos a login
 useEffect(
     ()=>{
         if(userData.token === ""){
             navigate("/login")
         }
     }
 ) 
 //si el token no esta vacio, mostramos el componente UserProfil



    return(

        <div className="container" id="tableContainer">
            <div className="row">
                <div className="col-md-12">
                    
                    {jobdates.map((element) => {
                        return(
                        <div key={element.id} className="row tableRow" >
                            <div key={element.id+1} className="row">
                                <div  className="col-md-12">
                                    Fecha: {element.day_date}
                                </div>
                                <div key={element.id+2} className="col-md-4">
                                    Cliente: {element.client.user.firstName}
                                </div>
                                <div key={element.id+3} className="col-md-4">
                                    Telefono: {element.client.user.phone}
                                </div>
                                <div key={element.id+4} className="col-md-6">
                                    email: {element.client.user.email}
                                </div>
                                
                            </div>
                            <div key={element.id+5} className="row">
                            <div key={element.id+5} className="col-md-6">
                                    boton editar
                                </div>
                                <div key={element.id+6} className="col-md-6">
                                    boton eliminar
                                </div>
                            </div>
                        </div>   
                        )
                        
                    })
                        
                    }
                </div>
            </div>
        </div>
    )

}
