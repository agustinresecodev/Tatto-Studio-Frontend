import { combineReducers } from "redux";
import userSlicer from "../components/Slicers/userSlicer";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
//import appointmentSlice from "../pages/appointmentSlice";

// defino los pasillos que tendrá mi almacén (importante crear los archivos correspondientes)
const reducers = combineReducers({
    user: userSlicer,
    //appointment: appointmentSlice
});

// opciones del persistor
const persistConfig = {
    key: "root",
    storage,
}

const persistedReducer = persistReducer (persistConfig, reducers)

//magia arcana
export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(thunk)
})