import axios from 'axios'
import {PREFIX} from "../constant/variable";

export const source_data_api=()=> axios.get(PREFIX+"/location_info").then(res=> res.data)
    .catch(e=>{
        if(e.response.status===403){
            window.location.href = "/login"
        }
    })

export const student_data=()=> axios.get(PREFIX+"/student_info").then(res=> res.data).catch(e=>{
    if(e.response.status===403){
        window.location.href = "/login"
    }
})
export const list_enable_api =()=>axios.get(PREFIX+"/list_enable").then(res=> res.data).catch(e=>{
    if(e.response.status===403){
        window.location.href = "/login"
    }
})
export const submit_booking=data =>axios.post(PREFIX+'/student_booking', data).then(res => res.data).catch(e=>{
    if(e.response.status===403){
        window.location.href = "/login"

    }
})
export const list_disable_date=()=>axios.get(PREFIX+'/list_booking_date').then(res => res.data).catch(e=>{
    if(e.response.status===403){
        window.location.href = "/login"
    }
})
export const get_history = () =>axios.get(PREFIX+'/student_history').then(res => res.data).catch(e=>{
    if(e.response.status===403){
        window.location.href = "/login"
    }
})
export const today_api =()=>axios.get(PREFIX+'/today').then(res=>res.data).catch(e=>{
    if(e.response.status===403){
        window.location.href = "/login"
    }
})
export const student_cancel =(id)=>axios.post(PREFIX+'/student_cancel',{id}).then(res=>res.data).catch(e=>{
    if(e.response.status===403){
        window.location.href = "/login"
    }
})
export const remainingTicket =()=>axios.get(PREFIX+'/remaining_ticket').then(res=>res.data).catch(e=>{
    if(e.response.status===403){
        window.location.href = "/login"
    }
})
