import {
    CHANGE_TILTEL_HEADER,
    HIDE_APP_BAR, SELECT_SOURCE,
    SELECT_DESTINATION,
    SELECT_DEPARTURE_DATE,
    SUBMIT_BOOKING,
    SOURCE_DATA,
    DESTINATION_DATA,
    RESET_STATE,
    TRIP_CHOICE,
    SELECT_RETURN_DATE,
    RETURN_DATE_STATUS,
    LIST_DATE_DISABLE,
    HISTORY_DATA,
    STUDENT_INFO,
    TODAY,
    LIST_ENABLE
} from "../constant/action_types";
import {init_status_app_bar,init_route_name,init_date,init_return} from "../init";
import {first_init_return} from "../init/date_fuction";

const initialState = {
    nameRoute : init_route_name,
    app_bar_status:init_status_app_bar,
    destination:'',
    source:'',
    date:(new Date()),
    isSubmit:false,
    source_data:[],
    destination_data:[],
    choice:"2",
    return_date:first_init_return(),
    list_date_disable:[],
    return_date_status:true,
    history_data:[],
    student_info:{},
    today:"",
    list_enable:[]
}

const rootReducer = (state = initialState, action)=>{
    switch (action.type){
        case CHANGE_TILTEL_HEADER:
            return {...state, nameRoute:action.payload}
        case HIDE_APP_BAR:
            return {...state, app_bar_status:action.payload}
        case SELECT_SOURCE:
            return {...state,source:action.payload}
        case SELECT_DESTINATION:
            return {...state,destination:action.payload}
        case SELECT_DEPARTURE_DATE:
            return {...state,date:action.payload}
        case SELECT_RETURN_DATE:
            return {...state,return_date:action.payload}
        case SUBMIT_BOOKING:
            return {...state,isSubmit:action.payload}
        case SOURCE_DATA:
            return {...state,source_data:action.payload}
        case DESTINATION_DATA:
            return {...state,destination_data:action.payload}
        case RESET_STATE:
            return {...state,source_data:[],date:"",isSubmit:false,destination:""}
        case TRIP_CHOICE:
            return {...state,choice:action.payload}
        case RETURN_DATE_STATUS:
            return {...state,return_date_status:action.payload}
        case LIST_DATE_DISABLE:
            return {...state,list_date_disable:action.payload}
        case HISTORY_DATA:
            return {...state,history_data:action.payload}
        case STUDENT_INFO:
            return {...state,student_info:action.payload}
        case TODAY:
            return {...state,today:action.payload}
        case LIST_ENABLE:
            return {...state,list_enable:action.payload}
        default:
            return state
    }
}

export default rootReducer
