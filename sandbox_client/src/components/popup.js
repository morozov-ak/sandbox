import React, { useState } from 'react'
import  { useHttp,setError } from '../hooks/http.hook';


export const popup = (error) =>{
    const {clearError} = useHttp
    var x = document.getElementById("snackbar");
    
    x.textContent = error;
    // Add the "show" class to DIV
    x.className = "show";
    console.log(x)
    
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", "") }, 3000);
    
}