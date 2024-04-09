import { useEffect, useState } from 'react';
import { bringAllAppointmentsCall } from '../../../services/apiCall';



export const Jobdates = () => {
    const [jobdates, setJobdates] = useState([]);
    const myPassport = JSON.parse(sessionStorage.getItem('passport'));

    const generateJobdates = () => {
        jobdates.forEach(element => {
            return(
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-4">
                                {element.date}
                            </div>
                            <div className="col-md-4">
                                {element.hour}
                            </div>
                            <div className="col-md-4">
                                {element.user}
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
    }

   
    useEffect(()=>{
        const fetchJobdates = async () => {
            const response = await bringAllAppointmentsCall(myPassport.token);
            
            setJobdates(response)
        }
        fetchJobdates()
        generateJobdates()
    },[])

    


    

};