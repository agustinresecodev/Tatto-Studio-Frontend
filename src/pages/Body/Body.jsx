import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../Auth/Login/Login"
import { Home } from "../Home/Home"
import { Register } from "../Auth/Register/Register"
import { Profile } from "../Users/Profile/Profile"

export const Body = () => {
    return(
        <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} /> 
            <Route path="/register" element={<Register/>} />
        </Routes>
    )
}