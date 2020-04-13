
import Axios from "axios";
// import qs from "qs";
// import {setUser} from "../utils/auth";

const axios = Axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/geocode/json',
    // withCredentials: true,
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
});


export const getGeoCode = (address) => {
    debugger
     return axios ({
        method: "GET",
        params:{
            address: address,
            // qs.stringify(address),
            key: "AIzaSyBTM6vT7ygkZ9wufF1ptGOTMzf8fQ6a2Hw"
        }
    })
    .then((res) => {
        console.log(res)
        const latitude = res.data.results[0].geometry.location.lat;
        const longitude = res.data.results[0].geometry.location.lng;
        console.log({lat:latitude,lon:longitude})
        return({lat:latitude,lon:longitude})
        
    }).catch((err) => {
        console.log(err)
        return ({lat:0,lon:0})
    });
}


