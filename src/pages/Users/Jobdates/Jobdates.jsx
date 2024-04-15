
import { bringMyAppointmentsCall } from "../../../services/apiCall";
import { useEffect, useState } from "react";
import "./Jobdates.css";

export const UserJobdates = () =>{

    const myPassport = JSON.parse(sessionStorage.getItem('passport'));

    const [jobdates, setJobdates] = useState([]);

    useEffect(()=>{
        setTimeout(() => {
        const fetchJobdates = async () => {
            const response = await bringMyAppointmentsCall(myPassport.token);
            setJobdates(response.data)
            
        }
        fetchJobdates()
        console.log(jobdates);
    },3000);
    
    
},[])
    console.log(jobdates);
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
