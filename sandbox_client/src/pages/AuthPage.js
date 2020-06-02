import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { popup } from '../components/popup'


export const AuthPage = () => {
    const message = useMessage()
    const {loading,error,request, clearError} = useHttp()
    const[form,setForm]=useState({
        email:'',password:'',name:''
    })
    

    useEffect ( ()=>{
        
        popup(error)
        //clearError()
    },[error,clearError] )

    const changeHandler = event=>{
        setForm({...form, [event.target.name]:event.target.value})
        console.log(form)
    }

    const registerHandler = async () => {
        try{
            const data = await request('/api/auth/register','POST',{...form})
            popup(data.message)
            console.log(data)
        }
        catch(e){}
    }
    const loginHandler = async () => {
        try{
            const data = await request('/api/auth/login','POST',{...form})
            if(data.message){popup(data.message)}
            console.log(data)
        }
        catch(e){}
    }
    
    return(
         
    <div className="auth">
        <div className="form-group">
            <label htmlFor="exampleDropdownFormEmail2">Email address</label>
            <input name="email" onChange={changeHandler} type="email" className="form-control" id="email" placeholder="email@example.com"/>
        </div>
        <div className="form-group">
            <label htmlFor="exampleDropdownFormEmail2">МНЕ НУЖНО ИМЯ!!!</label>
            <input name="name" onChange={changeHandler} type="name" className="form-control" id="name" placeholder="Имя"/>
        </div>

        <div className="form-group">
            <label htmlFor="exampleDropdownFormPassword2">Password</label>
            <input name="password" onChange={changeHandler} type="password" className="form-control" id="password" placeholder="Password"/>
        </div>

        <button type="submit" onClick={loginHandler} className="btn btn-primary mybtn">Sign in</button>
        <button type="submit" onClick={registerHandler} className="btn btn-success">Register</button>
        <div id="snackbar" >{error}</div>
    </div>  
  
    )
}