import {
    CHANGE_TILTEL_HEADER,
    HIDE_APP_BAR,
    SELECT_SOURCE,
    SELECT_DESTINATION,
    SELECT_DEPARTURE_DATE,
    SUBMIT_BOOKING,
    SOURCE_DATA,
    DESTINATION_DATA,
    STUDENT_INFO,
    RESET_STATE,
    TRIP_CHOICE,
    SELECT_RETURN_DATE,
    RETURN_DATE_STATUS,
    LIST_DATE_DISABLE,
    HISTORY_DATA,
    TODAY,
    LIST_ENABLE,
    LIST_FINAL,
    ENABLE_CHOICE,
    REMAINING_TICKET,
    DISABLED_BUTTON
    } from "../constant/action_types";

export const chageTitleHeader = nameRoute =>({type:CHANGE_TILTEL_HEADER,payload:nameRoute})
export const hideAppBar = status =>({type:HIDE_APP_BAR,payload:status})
export const selectSource = source => ({type:SELECT_SOURCE,payload:source})
export const selectDestination = destination => ({type:SELECT_DESTINATION,payload:destination})
export const selectDepartureDate = date =>({type:SELECT_DEPARTURE_DATE,payload:date})
export const submitBooking = status =>({type:SUBMIT_BOOKING,payload:status})
export const sourceData = data =>({type:SOURCE_DATA,payload:data})
export const destinationData = data =>({type:DESTINATION_DATA,payload:data})
export const studentInfo = data =>({type:STUDENT_INFO,payload:data})
export const resetState = () => ({type:RESET_STATE})
export const tripChoice = choice => ({type:TRIP_CHOICE,payload:choice})
export const selectReturnDate = date => ({type:SELECT_RETURN_DATE, payload:date})
export const returnDateStatus = status => ({type:RETURN_DATE_STATUS, payload:status})
export const listDateDisable = data => ({type:LIST_DATE_DISABLE, payload:data})
export const historyData= data => ({type:HISTORY_DATA, payload:data})
export const toDay= date => ({type:TODAY, payload:date})
export const listEnable= list => ({type:LIST_ENABLE, payload:list})
export const listFinal= list => ({type:LIST_FINAL, payload:list})
export const enableChoice= status => ({type:ENABLE_CHOICE, payload:status})
export const remainingTicketState= (ticket) => ({type:REMAINING_TICKET, payload:ticket})
export const disabledButton= (status) => ({type:DISABLED_BUTTON, payload:status})
