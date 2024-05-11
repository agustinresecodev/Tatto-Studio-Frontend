import { DayPicker } from 'react-day-picker';
import { format, set } from 'date-fns';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import CustomInput from '../CustomInput/CustomInput';

import 'react-day-picker/dist/style.css';
import { getAllClients, getArtistByUserId,getAllArtists, createAppointmentCall } from '../../services/apiCall';
import { getUserData } from '../Slicers/userSlicer';
import { ar } from 'date-fns/locale';

export const CreateAppointmentsForm = (appointments) => {
    const [selected, setSelected] = useState(null);

    const [clients, setClients] = useState("");
    const [clientFilter, setClientFilter] = useState("");    
    const [selectedClient, setSelectedClient] = useState("");
    const [filteredClients, setFilteredClients] = useState([]);
    const [totalClients, setTotalClients] = useState(0);
    
    const [artists, setArtists] = useState("");
    const [selectedArtist, setSelectedArtist] = useState("");
    const [filteredArtists, setFilteredArtists] = useState([]);
    const [artistFilter, setArtistFilter] = useState("");
    
    
    const [msg, setMsg] = useState("");

    const [appointmentData, setAppointmentData] = useState({
        day_date: "",
        description: "",
        artist: "",
        client: "",
        price: 0,
    })

    const userData = useSelector(getUserData)
    


// useEffect que traerá todos los clientes    
useEffect(()=>{
    const bringClients = () => {
        getAllClients(userData.token).then((res) => {
            setClients(res.data[0]);
            setTotalClients(res.data[1]);
            console.log(clients, totalClients);
        }).catch((err) => {
            console.log(err);
        });
    }
    bringClients();
},[])

// useEffect que traerá todos los artistas
useEffect(()=>{
    const bringArtists = () => {
        getAllArtists(userData.token).then((res) => {
            setArtists(res.data);
            console.log(artists);
            
        }).catch((err) => {
            console.log(err);
        });
    
    }
    bringArtists();
},[])

    
     // handler del buscador de clientes
  const clientFilterHandler = (e) => {
    setClientFilter(e.target.value);
  };

    // handler del buscador de artistas
  const artistFilterHandler = (e) => {
    setArtistFilter(e.target.value);
    console.log(e.target.id);
}


  // useEffect que hará el filtrado de clientes
  useEffect(() => {
    // debouncing (esperar a dejar de teclear para lanzar la petición)
    const lowercaseFilter = clientFilter.toLowerCase();

    if (clientFilter !== "") {
        // preparamos un setTimeout que se ejecutará al cabo de un segundo con una llamada a la API (en este caso filtrado en front del array)
      const filterTimer = setTimeout(() => {
        // filtramos el array de personajes
        const foundClients = clients.filter((client) => {
          return client.user.firstName.toLowerCase().includes(lowercaseFilter);
        });

        if (foundClients.length > 0) {
          setFilteredClients(foundClients);
        } else {
          setFilteredClients([]);
          // si al menos un personaje cumple el filtro, lo seteamos, else lo vaciamos
        }
    }, 1000);
    
    // preparamos el botón que cancelará el setTimeout preparado anteriormente cuando se desmonte el componente actual (Characters)
    // O SE DISPARE DE NUEVO EL USE EFFECT, de manera que creamos un bucle crear temporizador -> preparar cancelación -> cancelar + crear temporizador
    return () => clearTimeout(filterTimer);
    }
    else {
        console.log("el filtro está vacío")
        setFilteredClients([])
    }
  }, [clientFilter]);

    // useEffect que hará el filtrado de Artistas
    useEffect(() => {
        // debouncing (esperar a dejar de teclear para lanzar la petición)
        const lowercaseFilter = artistFilter.toLowerCase();
    
        if (artistFilter !== "") {
            // preparamos un setTimeout que se ejecutará al cabo de un segundo con una llamada a la API (en este caso filtrado en front del array)
          const filterTimer = setTimeout(() => {
            // filtramos el array de personajes
            const foundArtists = artists.filter((artist) => {
              return artist.user.firstName.toLowerCase().includes(lowercaseFilter);
            });
    
            if (foundArtists.length > 0) {
              setFilteredArtists(foundArtists);
            } else {
              setFilteredArtists([]);
              // si al menos un personaje cumple el filtro, lo seteamos, else lo vaciamos
            }
        }, 1000);
        
        // preparamos el botón que cancelará el setTimeout preparado anteriormente cuando se desmonte el componente actual (Characters)
        // O SE DISPARE DE NUEVO EL USE EFFECT, de manera que creamos un bucle crear temporizador -> preparar cancelación -> cancelar + crear temporizador
        return () => clearTimeout(filterTimer);
        }
        else {
            console.log("el filtro está vacío")
            setFilteredClients([])
        }
      }, [artistFilter]);



    //gestionamos que la fecha seleccionada sea posterior a la actual
    const manageTime = (e) => {
      if (dayjs(e).diff(new Date(), "h") <= 0) {
        setMsg("Trata de seleccionar un dia posterior a hoy.");
        setSelected(null);
        console.log(selected);
        return;
      }
      setMsg("");
      setSelected(dayjs(e).format("dddd, MMMM D, YYYY"));
      setAppointmentData({
        ...appointmentData,
        day_date: dayjs(e).format("YYYY-MM-DD"),
      })
      
    };

    const clientHandler = (e) => {
        setSelectedClient(e.target.id);
        setAppointmentData({
            ...appointmentData,
            client: e.target.id
        })
        console.log(appointmentData);
    }

    const artistHandler = (e) => {
        setSelectedArtist(e.target.id);
        
        setAppointmentData({
            ...appointmentData,
            artist: e.target.id
        })
        console.log(appointmentData);
    }

    const handlerProp = (e) => {
        setAppointmentData({
            ...appointmentData,
            [e.target.name]: e.target.value
        });
        console.log(appointmentData);
        
    }

    

    useEffect(() => {
    const userArtist = async () => {
        if (userData.decodificado.userRole === "artist") {
        const ifUserIsArtist = await getArtistByUserId(userData.decodificado.userId, userData.token)
        console.log(ifUserIsArtist.data.id);
        setAppointmentData({
            ...appointmentData,
            artist: ifUserIsArtist.data.id
        })
        
        
    
    }}
    userArtist();
    
},[appointmentData.artist])
   
const appointmentHandler = async () => {
    await createAppointmentCall(appointmentData, userData.token);
    console.log("Cita creada");
} 


    return(
        <>
        <div className="container sectionContainer">
            <DayPicker 
                mode='single'
                selected={selected}
                onSelect={(e) => manageTime(e)}
            />
            <pre>{msg}</pre>
            <p>Search Client</p>
            <CustomInput
                typeProp="text"
                nameProp="clientFilter"
                placeholderProp="Buscar cliente..."
                handlerProp={clientFilterHandler}
            />
           
            {filteredClients === "" ? (<p>Loading...</p>) :(
                
                <ol>
                    {filteredClients.map((client) => (
                        <ul id={client.id} name="client" value={client.id} key={client.id} onClick={clientHandler}>{client.user.firstName} {client.user.lastName}</ul>
                    ))}
                </ol>
            )}

            {userData.decodificado.userRole === "admin"?( 
            <div>
            
            <p>Search Artist</p>
            <CustomInput
                typeProp="text"
                nameProp="artistFilter"
                placeholderProp="Buscar Artist..."
                handlerProp={artistFilterHandler}
            />
           
            {filteredArtists === "" ? (<p>Loading...</p>) :(
                
                <ol>
                    {filteredArtists.map((artist) => (
                        <ul id={artist.id} value={artist.id} key={artist.id} onClick={artistHandler}>{artist.user.firstName} {artist.user.lastName}</ul>
                    ))}
                </ol>
            )}
            </div>

        ):("")}
           
          <CustomInput
            typeProp={"textarea"}
            nameProp={"description"}
            placeholderProp={"Descripción"}
            handlerProp={handlerProp}
          ></CustomInput>

            <CustomInput
            typeProp={"text"}
            nameProp={"price"}
            placeholderProp={"Price"}
            handlerProp={handlerProp}
          ></CustomInput>
            
            

        </div>
        <div className="container sectionContainer">
                <p>Selected Client:{selectedClient}</p>
                <p>Selected Artist:{selectedArtist}</p>
                <p>Selected Day:{selected}</p>
                <button
                    onClick={() => appointmentHandler()}
                >Crear Cita</button>
        </div>
        
        </>
    )
}

export default CreateAppointmentsForm