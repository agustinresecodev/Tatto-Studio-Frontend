import { useEffect, useState } from "react";
import  Modal  from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { bringAllUsersCall } from "../../../services/apiCall";
import { useSelector } from "react-redux";
import { getUserData } from "../../Slicers/userSlicer";
import "./UserListModal.css"
import { deleteUserCall } from "../../../services/apiCall";
import Alert from 'react-bootstrap/Alert';

export const   UsersAdministration = () => {

    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [areYouDeletingMe, setAreYouDeletingMe] = useState(null);
    const userData = useSelector(getUserData)
    console.log(userData.token)
    
    // Función que inicia el borrado del usuario y muestra u oculta el botón de confirmación 
    const deleteUserStepOne = (id) => {
        if (areYouDeletingMe === id) {
            setAreYouDeletingMe(null);
        } else {
        setShow(true);
        setAreYouDeletingMe(id);
        }   
    };

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

    const handleClose = () => {
        setShow(false)
        setAreYouDeletingMe(null)
    }

    // Funcion que nos trae todos los usuarios
    useEffect(()=>{
        const usersResults = async() =>{
            const response = await bringAllUsersCall(userData.token);
            setUsers(response.data)
            
        
        } 
        usersResults()
    },[]);

    
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
                                    <Button variant="primary">Edit</Button>
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
    
                                    
                                    </div>
                                )
                            })}
                       
           </div>
            
        )
    }
    
}

export default UsersAdministration;