import {createSlice} from '@reduxjs/toolkit';

// creamos nuestro pasillo para el usuario (slice de user)

export const userSlicer = createSlice({
    name: 'user',           //nombre del slice
    initialState: {         //estado inicial
        token: "",
        decodificado: {
            firstName:"",
            lastName:"",
            email:"",
            id:""
        },
    },

    // distintas acciones que se pueden realizar en el pasillo(tosa reciben un state y un action y devuelven un nuevo estado)
    reducers: {
        login: (state, action) => {
            console.log("login representando")
            return {
                ...state,
                ...action.payload
            }
            
        },

        logout:(state, action) => {
            console.log("logout representando")
            return {
                token: "",
                decodificado: {
                    firstName:"",
                    lastName:"",
                    email:"",
                    id:""
                }
            }
        }
    }
})

// exportamos las acciones a las que se accedera desde el useDispatch para escribir en el almacen
export const {login, logout} = userSlicer.actions;

// definimos y exportamos los metodos que nos permitirán venir al almacen a leer los datos
export const getUserData = (state) => state.user

// exportamos el pasillo
export default userSlicer.reducer;