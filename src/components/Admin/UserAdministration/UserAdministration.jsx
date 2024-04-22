import { useEffect, useState } from "react";
import  Modal  from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { bringAllUsersCall, bringUserByIdCall } from "../../../services/apiCall";
import { useSelector } from "react-redux";
import { getUserData } from "../../Slicers/userSlicer";
import "./UserListModal.css"
import { deleteUserCall } from "../../../services/apiCall";
import Alert from 'react-bootstrap/Alert';
import { CustomInput } from "../../CustomInput/CustomInput";
import { updateUserProfileCall } from "../../../services/apiCall";

export const   UsersAdministration = () => {

    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [areYouDeletingMe, setAreYouDeletingMe] = useState(null);
    const [areYouEditingMe, setAreYouEditingMe] = useState(null);
    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        isActive: null,
        
    });
    const [userBackup, setUserBackup] = useState({});

    const userData = useSelector(getUserData)
    
    
    // Función que inicia el borrado del usuario y muestra u oculta el botón de confirmación 
    const deleteUserStepOne = (id) => {
        if (areYouDeletingMe === id) {
            setAreYouDeletingMe(null);
        } else {
        setShow(true);
        setAreYouDeletingMe(id);
        }   
    };

    // Eliminacion de usuario
    const deleteUser = (id) => {
        return async () => {
            try {
                await deleteUserCall(id, userData.token);
                const response = await bringAllUsersCall(userData.token);
                setUsers(response.data);
            } catch (error) {
                console.log(error);
            }
        }
    } 
    
    // Inicio de edicion de usuario
    const startEditUser = (id) => {
        setAreYouEditingMe(id)
        const targetUserData = async() => {
            const response = await bringUserByIdCall(id, userData.token);
            setUserBackup(response.data)
            setProfileData(response.data)
            console.log(profileData)
        }
        setProfileData(targetUserData)
        
        
    }

    // Edicion de usuario
    const editUser = 
        async () => {
            try {
                console.log(profileData)
                updateUserProfileCall(profileData, userData.token, profileData.id);
                console.log('Profile updated');
            }catch(error){
                console.log(error)
            
        }
    }

    // Cierre de borrado
    const handleClose = () => {
        setShow(false)
        setAreYouDeletingMe(null)
        setAreYouEditingMe(null)
    }

    // Funcion que nos trae todos los usuarios
    useEffect(()=>{
        const usersResults = async() =>{
            const response = await bringAllUsersCall(userData.token);
            setUsers(response.data)
            
        
        } 
        usersResults()
    },[]);

    const inputHandler = (e) => {
        setProfileData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };
    
    // Si no hay usuarios, muestra un mensaje de carga
    if(users.length === 0){
        return <div>Loading...</div>
    }else{
        // Si hay usuarios, los muestra
        return(

            <div className="usersContainer">
                
                
                
                            {users.map((user)=>{
                                return(
                                    <div key={user.id}>
                                    {user.id}-
                                    {user.firstName} {user.lastName} -
                                    {user.email} -
                                    {user.userRole}
                                    {
                                    // Muestra los botones de edición y borrado
                                    }
                                    <Button variant="primary"onClick={()=>startEditUser(user.id)}>Edit</Button>
                                    <Button variant="danger" onClick={()=>deleteUserStepOne(user.id)}>Delete</Button>
                                    
                                    
                                    <Alert variant="success" show={areYouDeletingMe===user.id ?true:null}>
                                        <Alert.Heading>My Alert</Alert.Heading>
                                            <p>
                                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
                                            lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
                                            fermentum.
                                            </p>
                                            <hr />
                                        <div className="d-flex justify-content-end">
                                        <Button variant="danger" onClick={deleteUser(user.id)}>Delete</Button>
                                        <Button onClick={() => handleClose()} variant="outline-success">
                                            Close me
                                        </Button>
                                        </div>
                                    </Alert>
    
                                    <Modal show={areYouEditingMe === user.id ?true:null}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Edit User</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <form>
                                            <CustomInput
                                                titleProp={"First Name"} 
                                                typeProp="text"
                                                nameProp="firstName"
                                                value={profileData.firstName}
                                                placeholderProp={userBackup.firstName}                          
                                                handlerProp={inputHandler}  
                                            />

                        
                                            <CustomInput 
                                                titleProp={"Last Name"}
                                                typeProp="text"
                                                nameProp="lastName"
                                                value={profileData.lastName}
                                                placeholderProp={userBackup.lastName}
                                                handlerProp={inputHandler}  
                                            />
                        
                                            <CustomInput 
                                            titleProp={"Email"}
                                            typeProp="email"
                                            nameProp="email"
                                            value={profileData.email}
                                            placeholderProp={userBackup.email} 
                                            handlerProp={inputHandler}  
                                            />

                                            <CustomInput 
                                            titleProp={"Phone"}
                                            typeProp="text"
                                            nameProp="phone"
                                            value={profileData.phone}
                                            placeholderProp={userBackup.phone}
                                            handlerProp={inputHandler}  
                                            />

                                            <input type="checkbox" title="IsActive" name="isActive" value="true" checked={profileData.isActive === true ? true : null}/>
                                            
                                                
                                            </form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => handleClose()}>
                                                Close
                                            </Button>
                                            <Button variant="primary" onClick={() => editUser()}>
                                                Save Changes
                                            </Button>
                                        </Modal.Footer>

                                    </Modal>
                                    </div>
                                )
                            })}
                       
           </div>
            
        )
    }
    
}

export default UsersAdministration;