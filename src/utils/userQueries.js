import Axios from "axios";
// import qs from "qs";
// import {setUser} from "../utils/auth";

const axios = Axios.create({
    baseURL: 'http://localhost:3020/user/',
    withCredentials: true,
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
});

export const logout = ()=> {
    // debugger
    return axios({
            method: "GET",
            url: "logout",    
        })
        .then((response)=>{
            if (response.status===201)
                window.localStorage.clear();
                // removeItem("user");
            return (response)
        })
}

export const getToolList = () => {
    // debugger
    return axios({
        method: "GET",
        url: "/toolshed"
    })
    .then((response)=>{
        if (response.status===200){
            console.log(response)
            response = response.data.data
        }     
        return (response)
    })
}
