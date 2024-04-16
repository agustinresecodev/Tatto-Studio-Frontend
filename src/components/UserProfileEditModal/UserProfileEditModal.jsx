import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { bringProfileCall } from '../../services/apiCall';
import { updateProfileCall } from '../../services/apiCall';
import { CustomInput } from '../CustomInput/CustomInput';
import { useSelector } from 'react-redux';
import { getUserData } from '../Slicers/userSlicer';




export const  UserProfileEditModal = ({profileData,inputHandler,token}) => {
  const [show, setShow] = useState(false);
  //console.log(profileData, "profileData")
  const [userBackup, setUserBackup] = useState({});
  const [userTest, setUserTest] = useState({});
  //console.log(props.inputHandler, "props")
  //console.log(props.token, "props")
  //console.log(props, "props")
  const navigate = useNavigate();

  const handleClose = () => {
    
    navigate('/');

    setTimeout(() => {
      navigate('/profile');
    });

    console.log('cerrando modal');
    setShow(false)
  
  };

    //console.log(inputHandler, "inputHandler")
  

  const handleShow = () => setShow(true);

  const handlerUpdate = async () => {
    try{
      await updateProfileCall(profileData, token);
      console.log('Profile updated');
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }catch(error){
      console.log('Error updating profile:'+ error);
    }

  }
  
 
  const myPassport = useSelector(getUserData);
    

    useEffect(()=>{   
             const fetchProfile = async () => {
                const response = await bringProfileCall(myPassport.token);                
                setUserBackup(response)                
            }
            fetchProfile()
            
              
        
        
        
    },[])

    
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit Profile
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form >         
                        
                        <CustomInput
                          titleProp={"First Name"} 
                          typeProp="text"
                          nameProp="firstName"
                          value={profileData.firstName}
                          placeholderProp={userBackup.data?.firstName}                          
                          isDisabled=""
                          handlerProp={inputHandler}  
                        />

                        
                        <CustomInput 
                          titleProp={"Last Name"}
                          typeProp="text"
                          nameProp="lastName"
                          placeholderProp={userBackup.data?.lastName}
                          handlerProp={inputHandler}  
                        />
                        
                        <CustomInput 
                          titleProp={"Email"}
                          typeProp="email"
                          nameProp="email"
                          placeholderProp={userBackup.data?.email} 
                          handlerProp={inputHandler}  
                        />

                        <CustomInput 
                          titleProp={"Phone"}
                          typeProp="text"
                          nameProp="phone"
                          placeholderProp={userBackup.data?.phone}
                          handlerProp={inputHandler}  
                        />
                        
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlerUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserProfileEditModal;