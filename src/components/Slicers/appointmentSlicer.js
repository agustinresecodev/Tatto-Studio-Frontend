import { createSlice } from "@reduxjs/toolkit";

// creamos nuestro pasillo para las citas (slice de appointment)
export const appointmentSlicer = createSlice({
  name: "appointment", //nombre del slice
  initialState: {
    //estado inicial
    appointment: {
      id: 0,
      date: "",
      client:"",
      artist:"",
      description:"",
      price:0,
    },
  },

  reducers:{
    setAppointment: (state, action) => {
        console.log("setAppointment representando")
        return {
            ...state,
            ...action.payload
        }
    }
  }

});

export const { setAppointment } = appointmentSlicer.actions;

export const getAppointmentData = (state) => state.appointment;

export default appointmentSlicer.reducer;