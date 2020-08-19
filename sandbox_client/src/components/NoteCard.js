import React, { useState, useContext } from 'react'
import {AuthContext} from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useHistory } from 'react-router-dom'
//import { useMessage } from '../hooks/popup'


export const NoteCard = ({ note }) => {
  //const history = useHistory()
  const history = useHistory()
  //const message = useMessage()
    const {request} = useHttp()
    const auth = useContext(AuthContext)
    
    const[noteEdit,setNoteEdit]=useState({
        
        noteNameId:note._id, noteNameEdit:note.name, noteTextEdit:note.notetext
    })

    const DeleteHandler = async () => {
      try{
         await request('/api/note/deleteNote','POST', {...noteEdit},{
               authorization: `Bearer ${auth.token}`
           })
           history.push(`/Notes`)
           auth.message2('ВАС ТОЛЬКО ЧТО СТЁРЛИ!!!')
         
          
      }
      catch(err){console.log(err)}
  }
    
    const changeHandler = event=>{
        setNoteEdit({...noteEdit, [event.target.name]:event.target.value})
        
    }

    const createHandler = async () => {
        try{
            
            await request('/api/note/save','POST',{...noteEdit},{
                authorization: `Bearer ${auth.token}`
            })
            auth.message2('попап?')
           
            
        }
        catch(err){console.log(err)}
    }

    
            
  return (
    <>
      <h1>{note.name}</h1>
      <div className="input-group mb-3">
      <input onChange={changeHandler} value={noteEdit.noteNameEdit}   name="noteNameEdit" id="noteNameEdit"   className="form-control"  />
       <div className="input-group-append">
                <button onClick={createHandler} className="btn btn-success" type="button" id="button-addon2">Сохранить</button>
        </div>
      </div>
      
      <p>Дата создания: <strong>{new Date(note.date).toLocaleDateString()}</strong></p>
      <textarea onChange={changeHandler}  value={noteEdit.noteTextEdit} name="noteTextEdit" id="noteTextEdit" className="form-control" aria-label="With textarea"></textarea>
      <button onClick={DeleteHandler} className="btn btn-danger"  type="button"  id="button-addon2">Удалить</button>
      <div id="popup_container_" ></div>
    </>
  )


}
