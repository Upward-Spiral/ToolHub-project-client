import Axios from "axios";
// import qs from "qs";
// import {setUser} from "../utils/auth";

const axios = Axios.create({
    baseURL: `${process.env.REACT_APP_API_BASE}/user`,
    withCredentials: true,
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
});

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



