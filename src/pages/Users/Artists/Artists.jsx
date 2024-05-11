import { useState, useEffect } from 'react'
import { getArtistsCall } from '../../../services/apiCall'
import '../Jobdates/Jobdates.css'



export const Artists = () => {  
    const [artists, setArtists] = useState([])
    const myPassport = JSON.parse(sessionStorage.getItem('passport'));
    useEffect(() => {        
            
                const fetchArtist = async () => {
                    const response = await getArtistsCall();
                    setArtists(response.data);
                    
                    
                }
                fetchArtist();
                
             

    },[])
      
    const navigate = (id) => {
       console.log(id);
    }
    console.log(artists);
return (
    <div className="container" id="tableContainer">
        {artists.map((artist) => {
            return(
           <div key={artist.id} className="row tableRow" >
                <p>{artist.user.firstName}</p>
                <p>{artist.user.phone}</p>
                <p>{artist.style}</p>
                <p>{artist.user.email}</p>
                <button className="btn btn-primary" onClick={()=>{navigate(`${artist.id}`)}}>View more</button>
                
            </div>
            )
        })}
        
      
  
       
  
    </div>
)


}
export default Artists;
