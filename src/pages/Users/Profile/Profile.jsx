// Note: Profile Page
import { useEffect, useState } from "react";
import { bringProfileCall } from "../../../services/apiCall";
import { UserProfile } from "../../../components/UserProfile/UserProfile";

export const Profile = () => {
       
    return (
        <>
            <UserProfile/>
        </>
    )
}

export default Profile;