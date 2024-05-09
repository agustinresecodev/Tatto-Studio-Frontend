import { Modal, Accordion, Button } from "react-bootstrap"
import { CustomInput } from "../CustomInput/CustomInput"
import { DayPicker } from "react-day-picker";
import dayjs from "dayjs";

export const ModalAppointment = ({appointmentData,show,handleClose,handlerProp,filteredClients,filteredArtists,artistFilterHandler,clientFilterHandler,clientHandler,artistHandler,selected,msg,userData,editAppointment,manageTime}) =>{


return(
    <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Edit Appointment: {dayjs(appointmentData.day_date).format("YYYY-MM-DD")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Edit date</Accordion.Header>
                <Accordion.Body>
                  <DayPicker
                    mode="single"
                    selected={selected}
                    onSelect={(e) => manageTime(e)}
                  />
                  <pre>{msg}</pre>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Edit Client</Accordion.Header>
                <Accordion.Body>
                  <p>Selected Client {appointmentData.client}</p>
                  <CustomInput
                    typeProp="text"
                    nameProp="clientFilter"
                    placeholderProp="Buscar cliente..."
                    handlerProp={clientFilterHandler}
                  />

                  {filteredClients === "" ? (
                    <p>Loading...</p>
                  ) : (
                    <ol>
                      {filteredClients.map((client) => (
                        <ul
                          id={client.id}
                          name="client"
                          value={client.id}
                          key={client.id}
                          onClick={clientHandler}
                        >
                          {client.user.firstName} {client.user.lastName}
                        </ul>
                      ))}
                    </ol>
                  )}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Price</Accordion.Header>
                <Accordion.Body>
                  <CustomInput
                    typeProp="text"
                    nameProp="price"
                    placeholderProp={appointmentData.price}
                    handlerProp={handlerProp}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>description</Accordion.Header>
                <Accordion.Body>
                  <CustomInput
                    typeProp="textarea"
                    nameProp="description"
                    placeholderProp={appointmentData.description}
                    handlerProp={handlerProp}
                  />
                </Accordion.Body>
              </Accordion.Item>

              {userData.decodificado.userRole === "admin" ? (
                <Accordion.Item eventKey="4">
                <Accordion.Header>Artist</Accordion.Header>
                <Accordion.Body>
                  <div>
                    <p>Selected Artist: {appointmentData.artist}</p>
                    <CustomInput
                      typeProp="text"
                      nameProp="artistFilter"
                      placeholderProp="Buscar Artist..."
                      handlerProp={artistFilterHandler}
                    />

                    {filteredArtists === "" ? (
                      <p>Loading...</p>
                    ) : (
                      <ol>
                        {filteredArtists.map((artist) => (
                          <ul
                            id={artist.id}
                            value={artist.id}
                            key={artist.id}
                            onClick={artistHandler}
                          >
                            {artist.user.firstName} {artist.user.lastName}
                          </ul>
                        ))}
                      </ol>
                    )}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              ) : null}
            </Accordion>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={editAppointment}>
              Save Changes
            </Button>
          </Modal.Footer>
    </Modal>
    
    )
}