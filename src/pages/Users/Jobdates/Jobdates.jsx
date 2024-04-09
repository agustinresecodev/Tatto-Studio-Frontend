
import { bringAllAppointmentsCall } from "../../../services/apiCall";


export const UserJobdates = () =>{

    const myPassport = JSON.parse(sessionStorage.getItem('passport'));

    const [jobdates, setJobdates] = useState([]);

    useEffect(()=>{
        const fetchJobdates = async () => {
            const response = await bringAllAppointmentsCall(myPassport.token);
            setJobdates(response.data)
        }
        fetchJobdates()
    })
    

    return(
        ( response ? (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Jobdates</h1>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Jobdate</th>
                                    <th>Day</th>
                                    <th>Artist</th>
                                    <th>Client</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {jobdates.map((jobdate, index) => (
                                    <tr key={index}>
                                        <td>{jobdate.id}</td>
                                        <td>{jobdate.day_date}</td>
                                        <td>{jobdate.artist_id}</td>
                                        <td>{jobdate.client_id}</td>
                                        <td>{jobdate.description}</td>
                                        <td>{jobdate.price}</td>
                                                                             
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        ) : (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Loading...</h1>
                    </div>
                </div>
            </div>
        ))
                
        
    )
}
