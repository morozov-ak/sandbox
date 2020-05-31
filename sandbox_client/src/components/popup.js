import React from 'react'

export const popup = (error) =>{
    var x = document.getElementById("snackbar");
    x.textContent = error;
    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}