
import Axios from "axios";
import qs from "qs";
// import {setUser} from "../utils/auth";

const axios = Axios.create({
    baseURL: 'http://localhost:3020/user/',
    withCredentials: true,
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
});

export const getGeocodeBackEnd = (address) => {
    debugger
    return axios({
        method: "POST",
        url: "get-geo",
        data: address
        //  qs.stringify(address)
    })
    .then((response)=> {
        let res = response.data     
        return (res)
    })
}