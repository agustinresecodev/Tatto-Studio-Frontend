import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../Auth/Login/Login"
import { Home } from "../Home/Home"
import { Register } from "../Auth/Register/Register"
import { Profile } from "../Users/Profile/Profile"
import { UserJobdates } from "../Users/Jobdates/Jobdates"
import { Artists } from "../Users/Artists/Artists"
import AdminPage from "../Admin/AdminPage"
import { AdminUsers } from "../Admin/Users/AdminUsers"


export const Body = () => {
    return(
        <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} /> 
            <Route path="/register" element={<Register/>} />
            <Route path="/appointments" element={<UserJobdates/>} />
            <Route path="/artists" element={<Artists/>} />
            <Route path="/admin" element={<AdminPage/>} />
            <Route path="/admin/users" element={<AdminUsers/>} />
        </Routes>
    )
}