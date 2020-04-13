import Axios from "axios";
import qs from "qs";

const axios = Axios.create({
    baseURL: 'http://localhost:3020/',
    withCredentials: true,
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
});

export const signup = (user)=>{
    // debugger
    return axios({
        method: "POST",
        url: "signup",
        data: qs.stringify(user)
    })
    .then((response)=> {
        if (response.status===200) {
            setTempUserId(response.data);
        }       
        return (response)
    })
}

export const signupSecond = (user)=>{
    // debugger
    return axios({
        method: "POST",
        url: "update-np",
        data: qs.stringify(user)
    })
    .then((response)=> {
        if (response.status===200)
            setUser(response.data);
        return (response)
    })
}

export const login = (user) => {
    // debugger
    return axios({
        method: "POST",
        url: "login",
        data: qs.stringify(user)
    })
    .then((response)=>{
        if (response.status===201) 
            setUser(response.data);
        return (response)
        // return "something";   // if I wanted to get something out of this to the component
    })
}


export const setUser = (user)=> {
    window.localStorage.setItem("user", JSON.stringify(user));
}

export const setTempUserId = (user)=> {
    window.localStorage.setItem("tempUserID", user._id);
}

export const getUser = ()=> {
    return JSON.parse(window.localStorage.getItem("user"));
}

export const getTempUserId = ()=> {
    return window.localStorage.getItem("tempUserID");
}