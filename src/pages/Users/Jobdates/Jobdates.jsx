
import { bringMyAppointmentsCall } from "../../../services/apiCall";
import { useEffect, useState } from "react";
import "./Jobdates.css";
import { useSelector } from "react-redux";
import { getUserData } from "../../../components/Slicers/userSlicer";
import { useNavigate } from "react-router-dom";
import { JobdateTable } from "../../../components/JobdateTable/JobdateTable";

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

        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    
                    {jobdates.map((element) => {
                        return(
                            //element.id  element.day_date element.client.user.firstName element.client.user.phone element.client.user.email
                        <JobdateTable 
                            key={element.id}  
                            date={element.day_date} 
                            client_name={element.client.user.firstName} 
                            client_phone={element.client.user.phone} 
                            client_email={element.client.user.email}/> 
                        )
                        
                    })
                        
                    }
                </div>
            </div>
        </div>
    )

}
