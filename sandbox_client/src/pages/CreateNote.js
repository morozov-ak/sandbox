import React, { useState, useEffect,useContext } from 'react'
import { useMessage } from '../hooks/popup'
import {AuthContext} from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const CreateNote = () => {
    const {request} = useHttp()
    const auth = useContext(AuthContext)
    const message = useMessage()
    const[newNote,setnewNote]=useState({
        name:'', notetext:''
    })
    

    
    const changeHandler = event=>{
        setnewNote({...newNote, [event.target.name]:event.target.value})
        console.log(newNote)
    }

    const createHandler = async () => {
        try{
            console.log(auth.token)
            console.log(newNote)
            const data = await request('/api/note/create','POST',{...newNote},{
                authorization: `Bearer ${auth.token}`
            })
            console.log(data)
            message(data.message)
            setnewNote({name:'', notetext:''})
            
        }
        catch(e){}
    }
    
    
    return(
        
    <div>
        <h1>Создать заметку</h1>
        <div className="input-group mb-3">
            <input onChange={changeHandler} value={newNote.name} name="name" id="name" type="text" placeholder="Заголовок заметки" className="form-control" aria-label="Amount (to the nearest dollar)"/>
            <div className="input-group-append">
                <button onClick={createHandler} className="btn btn-success" type="button" id="button-addon2">Сохранить</button>
            </div>
        </div>


        <div className="input-group">
            
        <textarea onChange={changeHandler} value={newNote.notetext} name="notetext" id="notetext" className="form-control" aria-label="With textarea"></textarea>
        </div>
    </div>

        
    )
}