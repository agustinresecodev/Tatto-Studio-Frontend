import axios from "axios";

// Save in a constant the base URL of the API
const baseURL = "http://localhost:3000/api/";


// Register
export const registerNewUserCall = async (credentials) => {
  try {
    
    return  response = await axios.post(`${baseURL}auth/register`, credentials);
    
  } catch (error) {
    return error;
  }
};

// Login
export const loginCall = async (credentials) => {
  try {
    console.log(credentials);
    const res  = await axios.post(`${baseURL}auth/login`, credentials);
    console.log(res, "LOGIN");
    return res


  } catch (error) {
    return error;
  }
};


// Get profile
export const bringProfileCall = async (token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
   
    
    const res =  await axios.get(`${baseURL}users/profile`, config);
    
    return res
}