import axios from 'axios'

export const source_data_api=()=> axios.get("/location_info").then(res=> res.data)

export const student_data=()=> axios.get("/student_info").then(res=> res.data)
export const list_enable_api =()=>axios.get("/list_enable").then(res=> res.data)
export const submit_booking=data =>axios.post('/student_booking', data).then(res => res.data)
export const list_disable_date=()=>axios.get('/list_booking_date').then(res => res.data)
export const get_history = () =>axios.get('/student_history').then(res => res.data)
export const today_api =()=>axios.get('/today').then(res=>res.data)