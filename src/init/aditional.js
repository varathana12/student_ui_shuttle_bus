
export const deleteElementLocation = (collection,element)=>{
     var data =[];
     collection.map(item=>{
        if(item.location_id != element)
            data.push(item)
    })
    return data
}

export const remove = (list,value)=>{
    var data =[];
    list.map(item=>{
        if(item != value)
            data.push(item)
    })
    return data
}



