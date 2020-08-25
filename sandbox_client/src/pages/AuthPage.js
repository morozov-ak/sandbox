import React, { useState, useEffect,useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'


export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const {message2} = useContext(AuthContext)
    //const message = useMessage()
    const {error,request, clearError} = useHttp()
    const[form,setForm]=useState({
        email:'',password:'',name:''
    })
    

    useEffect ( ()=>{
        
        if(error){message2(error)}
        
    },[error,message2] )

    const changeHandler = event=>{
        setForm({...form, [event.target.name]:event.target.value})
        
    }

    const registerHandler = async () => {
        try{
            clearError()
            
            await request('/api/auth/register','POST',{...form})
            //console.log("data2:", data.message)
            
        }
        catch(e){
            
        }
    }

    const loginHandler = async () => {
        try{
            const data = await request('/api/auth/login','POST',{...form})
            if(data.message){message2(`dfghdfg${data}`)}
            auth.login(data.token, data.userId)
        }
        catch(e){}
    }
    
    return(
     <div className="rel">   
        <div className="auth">
            <div className="SiteLogoName">SandBOX</div>
            <div className="form-group">
                <label htmlFor="exampleDropdownFormEmail2">Email address:</label>
                <input name="email" onChange={changeHandler} type="email" className="form-control" id="email" placeholder="email@example.com"/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleDropdownFormEmail2">МНЕ НУЖНО ИМЯ!!!</label>
                <input name="name" onChange={changeHandler} type="name" className="form-control" id="name" placeholder="Имя"/>
            </div>

            <div className="form-group">
                <label htmlFor="exampleDropdownFormPassword2">Password:</label>
                <input name="password" onChange={changeHandler} type="password" className="form-control" id="password" placeholder="От 6 символов"/>
            </div>

            <button type="submit" onClick={loginHandler} className="btn btn-primary mybtn">Sign in</button>
            <button type="submit" onClick={registerHandler} className="btn btn-success">Register</button>
            
        </div>  
        
    </div> 
    )
}
