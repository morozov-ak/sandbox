import React, { useState, useEffect,useContext } from 'react'
import { useHistory} from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'


export const RegistrationPage = () => {
    const history=useHistory()
    //const auth = useContext(AuthContext)
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
            setForm({email: "", password: "", name: ""})
            history.push('/')
            
            
        }
        catch(e){
            
        }
    }

    
    return(
    <div className="rel">   
        <div className="auth">
            <div className="RegistrationLogoName">Registration</div>
            

            {/* <svg font-size="100px" width="400px" height="1.5em">
                <text font-size="100px" y="50%" textLength="400px" lengthAdjust="spacingAndGlyphs">Registration</text>
            </svg> */}


            <div className="form-group">
                <label htmlFor="exampleDropdownFormEmail2">Email address:</label>
                <input name="email" value={form.email} onChange={changeHandler} type="email" className="form-control" id="email" placeholder="email@example.com"/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleDropdownFormEmail2">Name:</label>
                <input name="name" value={form.name} onChange={changeHandler} type="name" className="form-control" id="name" placeholder="Имя"/>
            </div>

            <div className="form-group">
                <label htmlFor="exampleDropdownFormPassword2">Password:</label>
                <input name="password" value={form.password} onChange={changeHandler} type="password" className="form-control" id="password" placeholder="От 6 символов"/>
            </div>

            <button type="submit" onClick={()=>{history.push('/')}} className="btn btn-primary mybtn">Registred?</button>
            <button type="submit" onClick={registerHandler} className="btn btn-success">Register</button>
            
        </div>  
        
    </div> 
    )
}
