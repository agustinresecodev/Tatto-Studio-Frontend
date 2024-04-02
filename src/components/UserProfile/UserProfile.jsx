import { useEffect, useState } from "react";

import "./UserProfile.css";
import { bringProfileCall } from "../../services/apiCall";
import foto from "../../assets/img/user/user.png"

export const UserProfile = () => {
    const [userData, setUserData] = useState({});
    const myPassport = JSON.parse(sessionStorage.getItem('passport'));

    useEffect(()=>{
        const fetchProfile = async () => {
            const response = await bringProfileCall(myPassport.token);
            
            setUserData(response)
        }
        fetchProfile()
    },[])

    return (
        <div className="container" id="profileContainer">
            <div className="row">
                <div className="col-md-12">
                    <div className="row">

                        <div className="col-md-4">
                            <img src={foto} alt="foto" className="img-fluid img-thumbnail"/>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                Name: {userData.data.firstName}
                            </div>
                            <div className="row">
                                Surname: {userData.data.lastName}
                            </div>
                            <div className="row">
                                Phone: {userData.data.phone}
                            </div>
                            <div className="row">
                                Email: {userData.data.email}
                            </div>

                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UserProfile;