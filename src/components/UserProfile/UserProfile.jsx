import { useEffect, useState } from "react";

import "./UserProfile.css";
import { bringProfileCall } from "../../services/apiCall";
import foto from "../../assets/img/user/user.png"
import { UserProfileEditModal } from "../UserProfileEditModal/UserProfileEditModal";
import { useSelector } from "react-redux";
import { getUserData } from "../Slicers/userSlicer";

export const UserProfile = () => {
    const [userBackup, setUserBackup] = useState({});
    const myPassport = JSON.parse(sessionStorage.getItem('passport'));

    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
    });

    const userData = useSelector(getUserData);

    const inputHandler = (e) => {
        setProfileData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };

    useEffect(()=>{
        
        setTimeout(() => {
             const fetchProfile = async () => {                
                    const response = await bringProfileCall(userData.token);                    
                    setProfileData(response.data)
                    setUserBackup(response.data)
                                               
            }
            fetchProfile()
              
        }, 3000);
        
        
    },[])


    

    return (
        <div className="container" id="profileContainer">
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                    { profileData.id ?(
                        <>
                        <div className="col-md-4">
                            <img src={foto} alt="foto" className="img-fluid img-thumbnail"/>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                Name: {profileData.firstName}
                            </div>
                            <div className="row">
                                Surname: {profileData.lastName}
                            </div>
                            <div className="row">
                                Phone: {profileData.phone}
                            </div>
                            <div className="row">
                                Email: {profileData.email}
                            </div>
                            <div className="row">
                                <UserProfileEditModal
                                profileData={profileData}
                                inputHandler={inputHandler}
                                
                                token={userData.token} />

                            </div>

                        </div>
                        </>
                        ) : (
                            <div className="col-md-12">
                                <h1>Loading...</h1>
                            </div>
                            
                        )
                    }  
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UserProfile;