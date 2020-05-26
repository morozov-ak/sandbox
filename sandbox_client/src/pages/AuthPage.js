import React, { useState } from 'react'
export const AuthPage = () => {
    const[form,setForm]=useState({
        email:'',password:''
    })

    const changeHandler = event=>{
        setForm({...form, [event.target.name]:event.target.value})
        console.log(form)
    }
    
    return(
        
    <div className="auth">
        <div className="form-group">
            <label htmlFor="exampleDropdownFormEmail2">Email address</label>
            <input name="email" onChange={changeHandler} type="email" className="form-control" id="email" placeholder="email@example.com"/>
        </div>

        <div className="form-group">
            <label htmlFor="exampleDropdownFormPassword2">Password</label>
            <input name="password" onChange={changeHandler} type="password" className="form-control" id="password" placeholder="Password"/>
        </div>

        <button type="submit" className="btn btn-primary mybtn">Sign in</button>
        <button type="submit" className="btn btn-success">Register</button>
    </div>  
  
    )
}