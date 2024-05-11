import axios from "axios";

// Save in a constant the base URL of the API
const baseURL = "http://localhost:3000/api/";


// Register
export const registerNewUserCall = async (credentials) => {
  try {
    
   const response = await axios.post(`${baseURL}auth/register`, credentials);
   return response; 

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


// Get all users
export const bringAllUsersCall = async (token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
   
    
    const res =  await axios.get(`${baseURL}users/all`, config);
    
    return res
}

// Get user by ID
export const bringUserByIdCall = async (id, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res =  await axios.get(`${baseURL}users/get/${id}`, config);
    return res
}

// Get all appointments
export const bringMyAppointmentsCall = async (token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res =  await axios.get(`${baseURL}jobdates/artist/jobdates`, config);
    
    return res
}

// Get all appointments 
export const bringAllAppointmentsCall = async (token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res =  await axios.get(`${baseURL}jobdates`, config);
    console.log(res);
    return res
}




//update profile
export const updateProfileCall = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const res = await axios.put(`${baseURL}users/profile/update`, data, config)
 
  return res
}

//update user profile by admin
export const updateUserProfileCall = async (data, token,id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const res = await axios.put(`${baseURL}users/edit/${id}`, data, config)
}
//get all artists
export const getArtistsCall = async () => {
 

  const res = await axios.get(`${baseURL}artists`)

  return res
}

//delete user

export const deleteUserCall = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const res = await axios.delete(`${baseURL}users/delete/${id}`, config)
}

//Get all clients
export const getAllClients = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const res = await axios.get(`${baseURL}users/clients`, config)
  return res
}

//get artist by ID
export const getArtistByUserId = async (id,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const res = await axios.get(`${baseURL}artists/get/${id}`, config)
  return res
}


//get all artist
export const getAllArtists = async () => {
  const res = await axios.get(`${baseURL}artists/`)
  return res
}

//create appointment
export const createAppointmentCall = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const res = await axios.post(`${baseURL}jobdates/create`, data, config)
  return res
}


//edit appointment call
export const editAppointmentCall = async (data, token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const res = await axios.put(`${baseURL}jobdates/${id}`, data, config)
  return res
}

//delete appointment
export const deleteAppointmentCall = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const res = await axios.delete(`${baseURL}jobdates/${id}`, config)
  return res
}