// Note: Profile Page

import UserProfile from "../../../components/UserProfile/UserProfile";
import { useSelector } from "react-redux";
import { getUserData } from "../../../components/Slicers/userSlicer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Profile = () => {

    //leemos el estado de userSlice
    const userData = useSelector(getUserData)

    //instanciamos el hook de navegación
    const navigate = useNavigate();

  
       
    
    //si el token está vacío, redirigimos a login
    useEffect(
        ()=>{
            if(userData.token === ""){
                navigate("/login")
            }
        }
    ) 
    //si el token no esta vacio, mostramos el componente UserProfile
    return(
        <div>
            <UserProfile/>
        </div>
    )
}

       
    


export default Profile;