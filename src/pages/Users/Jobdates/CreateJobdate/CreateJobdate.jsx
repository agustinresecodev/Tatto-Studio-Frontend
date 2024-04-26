
import { useSelector } from "react-redux"

import CreateAppointmentsForm from "../../../../components/CreateAppointmentsForm/CreateAppointmentsForm"
import { getUserData } from "../../../../components/Slicers/userSlicer"
import { useEffect, useState } from "react"
import { bringMyAppointmentsCall } from "../../../../services/apiCall"







export const CreateJobdate = () => {
    const userData = useSelector(getUserData)
    const [appointments, setAppointments] = useState([])

    useEffect(()=>{
        setTimeout(() => {
            const fetchJobdates = async () => {
                const response = await bringMyAppointmentsCall(userData.token)
                setAppointments(response.data)
            }
            fetchJobdates()
            console.log(appointments)},3000)
    },[])



    return (
       <>
            <CreateAppointmentsForm/>
       </>
    )


}

export default CreateJobdate