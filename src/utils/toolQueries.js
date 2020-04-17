import Axios from "axios";
import qs from "qs";
// import {setUser} from "../utils/auth";

const axios = Axios.create({
    baseURL: `${process.env.REACT_APP_API_BASE}/tool`,
    withCredentials: true,
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
});

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

export const getToolDetails = (toolId) => {
    // debugger
    return axios({
        method: "GET",
        url: `/detail/${toolId}` 
    })
    .then((response)=>{
        if (response.status===200){
            console.log(response)
            response = response.data.data
        }     
        return (response)
    })
}

export const UploadToolImg = (theFile)=> {
    // debugger
    return axios({
            method: "POST",
            url: "/upload-image",
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
        url: "/create",
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

export const updateTool = (updatedTool)=> {
    debugger
    return axios({
        method: "POST",
        url: "/update",
        data: qs.stringify(updatedTool)    
    })
    .then((response)=>{
        if (response.status!==200){
            console.log(response);
            response=response.data
        }
            
        return (response)
    })

}

export const updateToolImage = (newToolImage) => {
    debugger
    return axios({
        method: "POST",
        url: "/update-img",
        data: qs.stringify(newToolImage)    
    })
    .then((response)=>{
        if (response.status!==200){
            console.log(response);
            response=response.data
        }
            
        return (response)
    })
  
}

export const searchTools = (searchData) => {
    debugger
    return axios({
        method: "POST",
        url: "/search",
        data: qs.stringify(searchData)    
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

export const shareTool = (toolId) => {
    debugger
    return axios({
            method: "GET",
            url: `/share/${toolId}`,   
        })
        .then((response)=>{
            if (response.status!==200){
                console.log(response);
                response=response.data
            }
                
            return (response)
        })
}

export const unshareTool = (toolId) => {
    debugger
    return axios({
            method: "GET",
            url: `/unshare/${toolId}`,   
        })
        .then((response)=>{
            if (response.status!==200){
                console.log(response);
                response=response.data
            }
                
            return (response)
        })
}


export const BorrowTool = (toolId) => {
    debugger
    return axios({
            method: "GET",
            url: `/borrow/${toolId}`,   
        })
        .then((response)=>{
            if (response.status!==200){
                console.log(response);
                response=response.data
            }
                
            return (response)
        })
}

export const reserveTool = (toolId) => {
    debugger
    return axios({
            method: "GET",
            url: `/reserve/${toolId}`,   
        })
        .then((response)=>{
            if (response.status!==200){
                console.log(response);
                response=response.data
            }
                
            return (response)
        })
}