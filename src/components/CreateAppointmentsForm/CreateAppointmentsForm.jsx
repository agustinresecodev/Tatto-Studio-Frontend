import { DayPicker } from 'react-day-picker';
import { format, set } from 'date-fns';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import CustomInput from '../CustomInput/CustomInput';

import 'react-day-picker/dist/style.css';
import { getAllClients } from '../../services/apiCall';
import { getUserData } from '../Slicers/userSlicer';

export const CreateAppointmentsForm = (appointments) => {
    const [selected, setSelected] = useState(null);
    const [clients, setClients] = useState("");
    const [selectedClient, setSelectedClient] = useState("");
    const [totalClients, setTotalClients] = useState(0);
    const [appointment, setAppointment] = useState("");
    const [msg, setMsg] = useState("");
    const [filter, setFilter] = useState("");
    const [filteredClients, setFilteredClients] = useState([]);
    const [appointmentData, setAppointmentData] = useState({
        day_date: "",
        description: "",
        artist: "",
        client: "",
        price: 0,
    })

    const userData = useSelector(getUserData)
    


    
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
    
     // handler del buscador de clientes
  const filterHandler = (e) => {
    setFilter(e.target.value);
  };

  // useEffect que hará el filtrado de clientes
  useEffect(() => {
    // debouncing (esperar a dejar de teclear para lanzar la petición)
    const lowercaseFilter = filter.toLowerCase();

    if (filter !== "") {
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
  }, [filter]);
  
    //gestionamos que la fecha seleccionada sea posterior a la actual
    const manageTime = (e) => {
      if (dayjs(e).diff(new Date(), "h") <= 0) {
        setMsg("Trata de seleccionar un dia posterior a hoy.");
        setSelected(null);
        console.log(selected);
        return;
      }
      setMsg("");
      setSelected(dayjs(e).format("dddd, MMMM D, YYYY h:mm A"));
      console.log(selected);
    };

    const clientHandler = (e) => {
        setSelectedClient(e.target.id);
        console.log(e.target.id);
    }

   
    return(
        <div className="container sectionContainer">
            <div className='dropdown'>
                <button className='dropbtn'>Select</button>
            </div>
            <DayPicker 
                mode='single'
                selected={selected}
                onSelect={(e) => manageTime(e)}
            />
            <CustomInput
                typeProp="text"
                nameProp="clientFilter"
                placeholderProp="Buscar cliente..."
                handlerProp={filterHandler}
            />
            
            
            {filteredClients === "" ? (<p>Loading...</p>) :(
                
                <ol>
                    {filteredClients.map((client) => (
                        <ul id={client.id} value={client.id} key={client.id} onClick={clientHandler}>{client.user.firstName} {client.user.lastName}</ul>
                    ))}
                </ol>
            )}
           
            
            

        </div>
        
    )
}

export default CreateAppointmentsForm