
import {useCallback} from 'react'
import { useHttp } from './http.hook'

export const useMessage = () =>{
    const {clearError} = useHttp()
    return useCallback( text =>{
        
        if(text===''){console.log('тут нет текста:',text)}
        
        if(text){
            var x = document.getElementById("snackbar");
            console.log("pop:", text)
            x.textContent = text;
            x.className = "show";
            setTimeout(function(){ 
                x.className = x.className.replace("show", "");
                //setTimeout(clearError,0) 
            }, 3000);}
            }, [])
    } 