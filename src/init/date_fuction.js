import moment from 'moment'


export const standard =(datetime)=>{
    console.log(datetime)
    var date = moment(datetime).format('MMM DD, YYYY');
    return date;
}

export const init_today =()=>{
    let date  = new Date()
    return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()
}

export const min_date_booking =(today,return_statue)=>{
    let current = moment(today).toDate();
    if(return_statue){
        current.setDate(current.getDate()+1);
    }
    else{
        current.setDate(current.getDate()+2);
    }



    return current.getFullYear()+"/"+(current.getMonth()+1)+"/"+current.getDate()
}
export const first_init_date = ()=>{
    let date = moment((new Date())).toDate()
    date.setDate(date.getDate()+2)
    return date
}
export const first_init_return=()=>{
    let date = moment((new Date())).toDate()
    date.setDate(date.getDate()+5)
    return date
}

export const list_enable_method = (list,list_booked)=>{
    console.log(list)
    var enable = []
    let temp
    for(var i in list.sort()){
        enable.push(list[i])
        temp = list[i]+2
        if(temp >= 7) {
            temp = temp - 7
        }
        enable.push(temp)
    }
    if(Array.from(new Set(enable)).length === list_booked.length){
        enable.push(10)
        return Array.from(new Set(enable))
    }else{
        return remove(Array.from(new Set(enable)),list_booked)
    }


}


export const remove =(list,item)=>{
    for(var i in item) {
        var index = list.indexOf(item[i]);
        if (index > -1) {
            list.splice(index, 1);
        }
        list
    }
    return list
}
export const init_booking =(list)=>{

}


export const max_date_booking = today =>{
    var current  = moment(today).toDate()
    current.setDate(current.getDate()+7)
    return current.getFullYear()+"/"+(current.getMonth()+1)+"/"+current.getDate()
}
export const list_booked= (list)=>{
    let list_date = []
    for (var i in list){
        list_date.push(moment(list[i]).toDate().getDay())
    }
    return list_date
}

export const init_date_booking = (today,list)=>{
    let day = moment(today).toDate()
    day.setDate(day.getDate()+2);
    while(true){
        for(var i in list){
            if(day.getDay() === list[i])
                return day
        }
        day.setDate(day.getDate()+1)
    }
    return day
}
export const init_return_booking = (booking_date,list)=>{

    let day = moment(booking_date).toDate()
    day.setDate(day.getDate()+1)
    while(true){
        for(var i in list){
            if(day.getDay() === list[i])
                return day
        }
        day.setDate(day.getDate()+1)
    }
    return day

}
export const add_date =(amount)=>{
    let date = moment(new Date()).toDate()
    date.setDate(date.getDate()+amount)
    return date
}
