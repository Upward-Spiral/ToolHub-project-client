import Axios from "axios";
import qs from "qs";

const axios = Axios.create({
    baseURL: process.env.REACT_APP_API_BASE,
    withCredentials: true,
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
});

export const checkUsername = (username) => {
    debugger
    return axios ({
        method: "GET",
        url: `/signup_usernamecheck/${username}`,
    })
    .then((response)=> {      
        return (response)
    })
    .catch(err => {
        console.log( `Error: ${err}`)
    })
}

export const checkEmailUniqueness = (email) => {
    debugger
    return axios ({
        method: "GET",
        url: `/signup_emailcheck/${email}`,
    })
    .then((response)=> {      
        return (response)
    })
    .catch(err => {
        console.log( `Error: ${err}`)
    })
}

export const signup = (user)=>{
    debugger
    return axios({
        method: "POST",
        url: "/signup",
        data: qs.stringify(user)
    })
    .then((response)=> {
        if (response.status===200) {
            console.log(response.data)
            setTempUser(response.data);
        }       
        return (response)
    })
    .catch(err => {
        console.log( `Error: ${err}`)
    })
}

export const signupSecond = (user)=>{
    // debugger
    return axios({
        method: "POST",
        url: "/update-np",
        data: qs.stringify(user)
    })
    .then((response)=> {
        if (response.status===200)
            setUser(response.data);
        return (response)
    })
    .catch(err => {
        console.log( `Error: ${err}`)
    })
}

export const login = (user) => {
    debugger
    return axios({
        method: "POST",
        url: "/login",
        data: qs.stringify(user)
    })
    .then((response)=>{
        if (response.status === 201) {
            setUser(response.data);
        } else if (response.status === 204) {
            response = "This username does not exist."           
        } else {
            response = response.data.messageBody
        }           
        return (response)       
    })
    .catch(err => {
        console.log( `Error: ${err}`)
    })
}


export const setUser = (user)=> {
    window.localStorage.setItem("user", JSON.stringify(user));
}

export const setTempUser = (user)=> {
    window.localStorage.setItem("tempUser", JSON.stringify(user));
}

export const getUser = ()=> {
    return JSON.parse(window.localStorage.getItem("user"));
}

export const getTempUser = ()=> {
    return JSON.parse(window.localStorage.getItem("tempUser"));
}