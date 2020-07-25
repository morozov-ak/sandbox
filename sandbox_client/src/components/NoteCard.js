import React, { useState, useEffect,useContext } from 'react'
import {AuthContext} from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const NoteCard = ({ note }) => {
    const {request} = useHttp()
    const auth = useContext(AuthContext)
    
    const[noteEdit,setNoteEdit]=useState({
        
        noteNameId:note._id, noteNameEdit:note.name, noteTextEdit:note.notetext
    })
    
    const changeHandler = event=>{
        setNoteEdit({...noteEdit, [event.target.name]:event.target.value})
        
    }

    const createHandler = async () => {
        try{
            console.log(auth.token)
            const data = await request('/api/note/save','POST',{...noteEdit},{
                authorization: `Bearer ${auth.token}`
            })
            console.log(data)
           
            
        }
        catch(err){console.log(err)}
    }

    
            
  return (
    <>
      <h1>{note.name}</h1>
      <div className="input-group mb-3">
      <input onChange={changeHandler} value={noteEdit.noteNameEdit}   name="noteNameEdit" id="noteNameEdit"   className="form-control" id="noteName" />
       <div className="input-group-append">
                <button onClick={createHandler} className="btn btn-success" type="button" id="button-addon2">Сохранить</button>
        </div>
      </div>
      
      <p>Дата создания: <strong>{new Date(note.date).toLocaleDateString()}</strong></p>
      <textarea onChange={changeHandler}  value={noteEdit.noteTextEdit} name="noteTextEdit" id="noteTextEdit" className="form-control" aria-label="With textarea"></textarea>
    </>
  )


}
