import Axios from "axios";
import qs from "qs";
// import {setUser} from "../utils/auth";

const axios = Axios.create({
    baseURL: 'http://localhost:3020/tool/',
    withCredentials: true,
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
});

export const UploadToolImg = (theFile)=> {
    // debugger
    return axios({
            method: "POST",
            url: "upload-image",
            data: theFile    
        })
        .then((response)=>{
            if (response.status===200){
                console.log(response);
                response=response.data
            }
                
            return (response)
        })
}

export const createNewTool = (newTool)=> {
    debugger
    return axios({
        method: "POST",
        url: "create",
        data: qs.stringify(newTool)    
    })
    .then((response)=>{
        if (response.status!==200){
            console.log(response);
            response=response.data
        }
            
        return (response)
    })

}