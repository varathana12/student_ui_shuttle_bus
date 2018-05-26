export const light_blue =  "#2196f3";
export const red_black = "#7E57C2"
export const light_gray = "#37474F"
export const kirirom = "#43A047"

export const danger = "#ff7473"
export const success = "#3ac569"
export const view = "#1ec0ff"
const collection_array = [light_blue,red_black,light_gray,kirirom];
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
export const randomColor =()=>{
    var index = getRandomInt(collection_array.length)
    return collection_array[index]
}