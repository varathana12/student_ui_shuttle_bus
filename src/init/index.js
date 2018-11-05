import moment from 'moment'
import {PROFILE,HOME} from "../constant/variable";
import {list_disable_date} from "../api";
import {remove} from "./aditional";
const path = window.location.pathname
var array = path.split('/');
export const init_status_app_bar = array[array.length -1] === PROFILE ? true : false;
export const init_route_name = array[array.length-1] && !(array[array.length-1]==="student")?array[array.length-1]:HOME



export const id_to_name = (collection,id)=>{
    for(var index in collection){
        if(collection[index].location_id===id){
            return collection[index].location_name;
        }
    }

}

export const date_now = ()=>{
    let date = new Date();

    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
}
const min_day_of_week = async()=>{
    let day = await date_enable()
    day = day.sort();
    return day
}

export const init_date = async()=>{
    let date = new Date(init_min_date())
    while(true){
        if(date.getDay()< await min_day_of_week()[0]){
            date.setDate(date.getDate()+1)
        }
        else{
            break
        }
    }
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()

}

export const init_max_date = async()=>{
    let date = new Date(await init_date());
    date.setDate(date.getDate()+6)
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
}
export const init_min_date =()=>{
    let date = new Date(date_now());
    date.setDate(date.getDate()+2)
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
}
export const init_return =async()=>{

    let date = new Date(await init_date());
    let sort_date = await min_day_of_week()
    date.setDate(date.getDate()+(sort_date[1]-sort_date[0]))
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
}
export const loop_date =(init,add)=>{
    init = init + add;
    if(init >= 7){
        init = init -7
    }
    return init
}

export const init_min_return = (date)=>{

    let min_date = new Date(date)
    min_date.setDate(min_date.getDate()+1)
    return min_date.getFullYear()+"-"+(min_date.getMonth()+1)+"-"+min_date.getDate()
}

export const date_disable = (date) =>{
    const disable_date = date.map(item=>{
        return moment(item,"MMMM DD YYYY, h:mm:ss a").toDate().getDay()
    })
    return disable_date
}

export const date_enable = async() =>{

    let list_date_disable = await list_disable_date()
    let enable_date = [5,6]
    enable_date.map(item=>{
        enable_date.push(loop_date(item,2))
    })
    date_disable(list_date_disable).map(item=>{
            enable_date = remove(enable_date,item)
    })

    console.log()
    return enable_date
}

export const convert_date_fomart = (date)=>{
    let format = moment(date,"MMMM DD YYYY, h:mm:ss a")

    return format.format("DD/MM/YYYY").toString()
}


