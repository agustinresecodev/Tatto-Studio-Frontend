// Note: Profile Page

import UserProfile from "../../../components/UserProfile/UserProfile";
import { useSelector } from "react-redux";
import { getUserData } from "../../../components/Slicers/userSlicer";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";


export const Profile = () => {

    //leemos el estado de userSlice
    const userData = useSelector(getUserData)

    //instanciamos el hook de navegación
    const navigate = useNavigate();

    
     
    //si el token no esta vacio, mostramos el componente UserProfile
    return(
        <>
        {
            (userData.token === "")?(
                <Navigate to="/login" />
            ):(
                <div>
                    <UserProfile/>
                </div>
            )
                
            
        }
        
        </>
    )
}

       
    


export default Profile;