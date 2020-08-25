import React, { useState, useContext, useEffect } from 'react'
import {AuthContext} from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const CreateNote = () => {
    const {request} = useHttp()
    const {message2} = useContext(AuthContext)
    const auth = useContext(AuthContext)
    const[newNote,setnewNote]=useState({
        name:'', notetext:''
    })
    //console.log('auth1:',auth)
    useEffect(()=>{
        //console.log('тут надо проверить аутнетификацию')
        async function chek_auth(){
            try{
                //console.log('trying check')
                await request('/api/note/notes','GET',null,{
                    authorization: `Bearer ${auth.token}`
                    })
            }
            catch(e){
                //console.log('e:', e)
            }
        }
        chek_auth()
        
        
    },[auth.token,request])

    
    const changeHandler = event=>{
        setnewNote({...newNote, [event.target.name]:event.target.value})
        //console.log(newNote)
    }

    const createHandler = async () => {
        try{
            //console.log(auth.token)
            //console.log(newNote)
            await request('/api/note/create','POST',{...newNote},{
                authorization: `Bearer ${auth.token}`
            })
            message2(`Создана новая заметка: ${newNote.name} `, newNote)
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