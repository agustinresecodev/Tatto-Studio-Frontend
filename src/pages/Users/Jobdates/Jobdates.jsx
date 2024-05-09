import {
  bringMyAppointmentsCall,
  getAllClients,
  getAllArtists,
  editAppointmentCall,
  deleteAppointmentCall,
} from "../../../services/apiCall";
import { useEffect, useState } from "react";
import "./Jobdates.css";
import { useSelector } from "react-redux";
import { getUserData } from "../../../components/Slicers/userSlicer";

import { Spinner } from "react-bootstrap";
import dayjs from "dayjs";
import { Alert, Button } from "react-bootstrap";
import CustomInput from "../../../components/CustomInput/CustomInput";
import { ButtonC } from "../../../components/ButtonC/ButtonC";
import { ModalAppointment } from "../../../components/ModalAppointments/ModalAppointment";
import { Prev } from "react-bootstrap/esm/PageItem";
import { set } from "date-fns";

export const UserJobdates = () => {
  //Constantes para filtro de fechas
  const [dayFilter, setDayFilter] = useState("");
  const [daysfiltered, setDaysFiltered] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [noResult, setNoResult] = useState(false);

  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [client, setClient] = useState("");
  const [selected, setSelected] = useState(null);

  //Constantes para filtro de artistas
  const [artists, setArtists] = useState("");
  const [selectedArtist, setSelectedArtist] = useState("");
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [artistFilter, setArtistFilter] = useState("");

  //Constantes para filtro de clientes
  const [clients, setClients] = useState("");
  const [clientFilter, setClientFilter] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [totalClients, setTotalClients] = useState(0);

  //constante para mostrar alerta de borrado
  const [areYouDeletingMe, setAreYouDeletingMe] = useState(null);

  const [msg, setMsg] = useState("");
  const [jobdates, setJobdates] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState({
    id: 0,
    day_date: "",
    client: {
      id: 0,
      user: {
        id: 0,
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
      },
    },
    price: "",
    description: "",
    artist: {
      id: 0,
      user: {
        id: 0,
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
      },
    },
  });
  const [appointmentData, setAppointmentData] = useState({
    id: 0,
    day_date: "",
    client: 0,
    price: 0,
    description: "",
    artist: 0,
  });

  // useEffect que traerá todos los clientes
  useEffect(() => {
    const bringClients = () => {
      getAllClients(userData.token)
        .then((res) => {
          setClients(res.data[0]);
          setTotalClients(res.data[1]);
          console.log(clients, totalClients);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    bringClients();
  }, []);

  // useEffect que traerá todos los artistas
  useEffect(() => {
    const bringArtists = () => {
      getAllArtists(userData.token)
        .then((res) => {
          setArtists(res.data);
          console.log(artists);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    bringArtists();
  }, []);

  // handler del buscador de clientes
  const clientFilterHandler = (e) => {
    setClientFilter(e.target.value);
  };

  // handler del buscador de artistas
  const artistFilterHandler = (e) => {
    setArtistFilter(e.target.value);
    console.log(e.target.id);
  };

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
    } else {
      console.log("el filtro está vacío");
      setFilteredClients([]);
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
    } else {
      console.log("el filtro está vacío");
      setFilteredClients([]);
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
    });
    console.log(appointmentData);
  };

  //handler de cierre
  const handleClose = () => {
    setShow(false);
    setAreYouDeletingMe(null);
  };

  //handler de apertura del modal
  const handleShow = (appointment) => {
    //setea selected appointment con el appointment que se pasa como parametro
    setSelectedAppointment(appointment);

    //setea appointmentData con los datos del appointment que se pasa como parametro
    setAppointmentData({
      id: appointment.id,
      day_date: appointment.day_date,
      client: appointment.client.id,
      price: appointment.price,
      description: appointment.description,
      artist: appointment.artist.id,
    });

    //abre el modal
    setShow(true);

    console.log(selectedAppointment);

    console.log(appointmentData);
  };

  //handler de borrado
  const handlerDelete = async (id) => {
    try {
      await deleteAppointmentCall(id, userData.token);
      const response = await bringMyAppointmentsCall(userData.token);
      setJobdates(response.data);
      console.log("Cita Eliminada");
      setShow(false);
    } catch (error) {
      console.log("Error borrando cita:" + error);
    }
  };

  //leemos el estado de userSlice
  const userData = useSelector(getUserData);

  //useEffect que trae las citas
  useEffect(() => {
    setTimeout(() => {
      const fetchJobdates = async () => {
        const response = await bringMyAppointmentsCall(userData.token);
        setJobdates(response.data);
        setDaysFiltered(response.data);
      };
      fetchJobdates();
    }, 3000);
  }, []);

  //useEffect hará filtradas por fecha

  useEffect(() => {
    // debouncing (esperar a dejar de teclear para lanzar la petición)

    setIsSearching(true);
    if (dayFilter !== "") {
      // preparamos un setTimeout que se ejecutará al cabo de un segundo con una llamada a la API (en este caso filtrado en front del array)

      const filterTimer = setTimeout(() => {
        // filtramos el array de citas
        const foundDates = jobdates.filter((appointment) => {
          return appointment.day_date.includes(dayFilter);
        });

        console.log("foundDates", foundDates);

        if (foundDates.length > 0) {
          console.log("foundDates", foundDates);
          setDaysFiltered(foundDates);
        } else {
          setDaysFiltered([]);
          setIsSearching(false);
          setNoResult(true);
          // si al menos un personaje cumple el filtro, lo seteamos, else lo vaciamos
        }
      }, 1000);

      // preparamos el botón que cancelará el setTimeout preparado anteriormente cuando se desmonte el componente actual (Characters)
      // O SE DISPARE DE NUEVO EL USE EFFECT, de manera que creamos un bucle crear temporizador -> preparar cancelación -> cancelar + crear temporizador
      return () => clearTimeout(filterTimer);
    } else {
    }
  }, [dayFilter]);

  //handler de los clientes
  const clientHandler = (e) => {
    setSelectedClient(e.target.id);
    setAppointmentData({
      ...appointmentData,
      client: e.target.id,
    });
    console.log(appointmentData);
  };

  const handlerProp = (e) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value,
    });
    console.log(appointmentData);
  };

  //handler de filtro de fechas
  const handlerDayFilter = (e) => {
    console.log(e.target.value);
    setDayFilter(e.target.value);
    console.log(dayFilter);
  };

  //handler de los artistas
  const artistHandler = (e) => {
    setSelectedArtist(e.target.id);

    setAppointmentData({
      ...appointmentData,
      artist: e.target.id,
    });
  };

  //funcion que llama a la api para editar una cita

  const editAppointment = async () => {
    try {
      await editAppointmentCall(
        appointmentData,
        userData.token,
        selectedAppointment.id
      );
      console.log("Cita editada");
      setShow(false);
    } catch (error) {
      console.log("Error editando cita:" + error);
    }
  };

  // Función que inicia el borrado del usuario y muestra u oculta el botón de confirmación
  const deleteUserStepOne = (id) => {
    console.log(id);
    if (areYouDeletingMe === id) {
      setAreYouDeletingMe(null);
    } else {
      setShowDelete(true);
      setAreYouDeletingMe(id);

      console.log(areYouDeletingMe);
    }
  };

  if (jobdates.length === 0) {
    return (
      <div className="container align-center tableRow">
        <div className="row">
          <div className="col-md-12 tableRow">
            <a href="/appointments/create">
              <h1>Create appointments</h1>
            </a>
          </div>
        </div>
        {isSearching ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : noResult ? (
          <p>No results found</p>
        ) : null}
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 tableRow">
            <a href="/appointments/create">
              <h1>Create appointments</h1>
            </a>
            <h3>Search a date</h3>
            <CustomInput
              typeProp="date"
              nameProp="dayfilter"
              handlerProp={handlerDayFilter}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {daysfiltered.map((element) => {
              return (
                //element.id  element.day_date element.client.user.firstName element.client.user.phone element.client.user.email
                <div key={element.id} className="row tableRow">
                  <div className="row">
                    <div className="col-md-12">Fecha: {element.day_date}</div>
                    <div className="col-md-6">
                      Cliente: {element.client.user.firstName}{" "}
                    </div>
                    <div className="col-md-6">
                      Telefono: {element.client.user.phone}
                    </div>
                    <div className="col-md-6">
                      email: {element.client.user.email}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <ButtonC
                        title={"Editar"}
                        className={"regularButtonClass"}
                        functionEmit={() => {
                          handleShow(element);
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <ButtonC
                        title={"Eliminar"}
                        className={"regularButtonClass"}
                        functionEmit={() => {
                          deleteUserStepOne(element.id);
                          console.log(element);
                        }}
                      />
                    </div>
                  </div>
                  <Alert
                    variant="danger"
                    show={areYouDeletingMe === element.id ? true : null}
                  >
                    <p>Are you sure to delete?</p>
                    <ButtonC
                      title={"Eliminar"}
                      className={"regularButtonClass"}
                      functionEmit={() => {
                        handlerDelete(element.id - 1);
                      }}
                    />
                  </Alert>
                </div>
              );
            })}
          </div>
        </div>
        <ModalAppointment
          appointmentData={appointmentData}
          show={show}
          handleClose={handleClose}
          handlerProp={handlerProp}
          filteredClients={filteredClients}
          filteredArtists={filteredArtists}
          artistFilterHandler={artistFilterHandler}
          clientFilterHandler={clientFilterHandler}
          selected={selected}
          msg={msg}
          userData={userData}
          editAppointment={editAppointment}
          manageTime={manageTime}
          clientHandler={clientHandler}
          artistHandler={artistHandler}
        ></ModalAppointment>
      </div>
    );
  }
};
