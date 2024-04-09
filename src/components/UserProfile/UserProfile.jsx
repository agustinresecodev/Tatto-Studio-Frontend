import { useEffect, useState } from "react";

import "./UserProfile.css";
import { bringProfileCall } from "../../services/apiCall";
import foto from "../../assets/img/user/user.png"
import { ButtonC } from "../ButtonC/ButtonC";
import { UserProfileEditModal } from "../UserProfileEditModal/UserProfileEditModal";

export const UserProfile = () => {
    const [userData, setUserData] = useState({});
    const [userBackup, setUserBackup] = useState({});
    const myPassport = JSON.parse(sessionStorage.getItem('passport'));

    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
    });

    const inputHandler = (e) => {
        setProfileData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };

    useEffect(()=>{
        
        setTimeout(() => {
             const fetchProfile = async () => {
                const response = await bringProfileCall(myPassport.token);
                
                setUserData(response)
                setUserBackup(response)

                
            }
            fetchProfile()
              
        }, 3000);
        
        
    },[])


    

    return (
        <div className="container" id="profileContainer">
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                    { userData.data ?(
                        <>
                        <div className="col-md-4">
                            <img src={foto} alt="foto" className="img-fluid img-thumbnail"/>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                Name: {userData.data?.firstName}
                            </div>
                            <div className="row">
                                Surname: {userData.data?.lastName}
                            </div>
                            <div className="row">
                                Phone: {userData.data?.phone}
                            </div>
                            <div className="row">
                                Email: {userData.data?.email}
                            </div>
                            <div className="row">
                                <UserProfileEditModal
                                profileData={profileData}
                                inputHandler={inputHandler}
                                
                                token={myPassport.token} />

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