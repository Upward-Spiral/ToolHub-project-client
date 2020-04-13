import categories from '../categories.json';

// import React from 'react';

export const getCatL0List = ()=> {
    let catList = [];
    categories.forEach((category)=>{
        catList.push(category.name)
    })
    return catList;
}

export const getCatL1List = (categoryName)=> { // e.g piler
    let catList = [];
    let targetCat = categories.filter((category)=>{
        return category.name === categoryName
    })
    targetCat[0].subCat1.forEach((subCat1)=>{
        catList.push(subCat1.name)
    })
    return catList;
}

export const getCatL2List = (categoryTree)=> { // e.g ["file", "common"]
    // debugger
    let catList = [];
    let targetParrentCat = categories.filter((category)=>{
        return category.name === categoryTree[0]  // returns file object
    })
    let targetCat = targetParrentCat[0].subCat1.filter((cat)=>{
        return cat.name === categoryTree[1]  // returns common object
    })
    if (targetCat[0].subCat2.length >0) {
        targetCat[0].subCat2.forEach((subCat)=>{ 
            catList.push(subCat.name) 
        }) 
    }
    return catList;
}



