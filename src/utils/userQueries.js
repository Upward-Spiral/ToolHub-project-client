import Axios from "axios";
import qs from "qs";
// import {setUser} from "../utils/auth";

const axios = Axios.create({
    baseURL: `${process.env.REACT_APP_API_BASE}/user`,
    withCredentials: true,
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
});

export const getProfile = (userId) => {
    return axios ({
            method: "GET",
            url: `/profile/${userId}`,
        })
        .then((response)=>{
            if (response.status!==200){
                console.log(response);
                response=response.data
            }
                
            return (response)
        })
        .catch ((err) => {
            console.log(err)
        })
}

export const uploadUserImg = (theFile)=> {
    debugger
    return axios({
            method: "POST",
            url: "/upload-image",
            data: theFile    
        })
        .then((response)=>{
            if (response.status===200)
            {
                console.log(response);
                response=response.data
            }
                
            return (response)
        })
        .catch ((err) => {
            console.log(err)
        })
}

export const updateUserImg = (theImage)=> {
    debugger
    return axios({
            method: "POST",
            url: "/update-image",
            data: qs.stringify(theImage)    
        })
        .then((response)=>{
            if (response.status===200)
            {
                console.log(response);
                response=response.data
            }
                
            return (response)
        })
        .catch ((err) => {
            console.log(err)
        })
}

export const updateProfile = (userInfo) => {
    debugger
    return axios({
        method: "POST",
        url: "/update",
        data: userInfo
    })
    .then((response)=>{
        if (response.status===200)
        {
            console.log(response);
            response=response.data
        }
            
        return (response)
    })
    .catch ((err) => {
        console.log(err)
    })
}

export const logout = ()=> {
    // debugger
    return axios({
            method: "GET",
            url: "/logout",    
        })
        .then((response)=>{
            if (response.status===201)
                window.localStorage.clear();
                // removeItem("user");
            return (response)
        })
}



