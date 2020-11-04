import React, { useState, useEffect,useContext } from 'react'
import {useHistory} from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'


export const AuthPage = () => {
    const history=useHistory()
    const auth = useContext(AuthContext)
    const {message2} = useContext(AuthContext)
    //const message = useMessage()
    const {error,request} = useHttp()
    const[form,setForm]=useState({
        email:'',password:'',name:''
    })
    

    useEffect ( ()=>{
        
        if(error){message2(error)}
        
    },[error,message2] )

    const changeHandler = event=>{
        console.log("Change")
        setForm({...form, [event.target.name]:event.target.value})
        
    }



    const loginHandler = async () => {
        
        try{
            const data = await request('/api/auth/login','POST',{...form})
            
            if(data.message){message2(`${data}`)}
            
            auth.login(data.token, data.userId)
            
        }
        catch(e){message2(e)}
    }

    const switchToPass = async () => {
        
        const input = document.getElementById('password');
        input.focus();
        input.select();
    }


    


    
    return(
        
    <div className="rel">   
        <div className="auth" onSubmit={(event)=>{event.preventDefault()}}>
            <div className="SiteLogoName">SandBOX</div>
            <div className="form-group">
                <label htmlFor="exampleDropdownFormEmail2">Email address:</label>
                <input name="email" onKeyPress={(e)=>{if(e.key==="Enter"){switchToPass()}}} onChange={changeHandler} type="email" className="form-control" id="email" placeholder="email@example.com"/>
            </div>
            

            <div className="form-group">
                <label htmlFor="exampleDropdownFormPassword2">Password:</label>
                <input name="password" onKeyPress={(e)=>{if(e.key==="Enter"){loginHandler()}}} onChange={changeHandler} type="password" className="form-control" id="password" placeholder="От 6 символов"/>
            </div>

            <button type="submit" onClick={loginHandler} className="btn btn-primary mybtn">Войти</button>
            <button  onClick={()=>{history.push('/RegistrationPage')}} className="btn btn-success">Зарегистрироваться</button>
            
        </div>  
        
    </div> 
    )
}
