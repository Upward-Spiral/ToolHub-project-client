
import Axios from "axios";

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
            key: process.env.REACT_APP_GOOGLE_KEY
        }
    })
    .then((res) => {
        console.log(res)
        const latitude = res.data.results[0].geometry.location.lat;
        const longitude = res.data.results[0].geometry.location.lng;
        console.log({lat:latitude,lng:longitude})
        return({lat:latitude,lng:longitude})
        
    }).catch((err) => {
        console.log(err)
        return ({lat:0,lng:0})
    });
}


