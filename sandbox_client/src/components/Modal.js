import React, { useContext } from 'react'
import {AuthContext} from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
//import {Loader} from '../components/Loader'

import { useHistory } from 'react-router-dom'

export const Modal = ({ note }) => {
  const { request} = useHttp()
  const {message2} = useContext(AuthContext)
  const history = useHistory()
  const auth = useContext(AuthContext)
    
    const DeleteHandler = async (id,event) => {
      try{ 
        await request('/api/note/deleteNote','POST', {noteNameId:id},{
                authorization: `Bearer ${auth.token}`
        })
        message2("Удалено")
        
            
      }
      catch(err){console.log(err)}
      history.push(`/Create`)
      history.push(`/Notes`)
  }

  


  



  return (
    <>
        <button onClick={(event)=>{event.stopPropagation();console.log(note._id)}} type="button" class="btn btn-danger" data-toggle="modal" data-target={`#f${note._id}`}>
            Удалить  {note.name}
        </button>


        <div class="modal fade" id={`f${note._id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                Удалить заметку: {note.name} ???
            </div>
            <div class="modal-footer">
                <button onClick={(event)=>{event.stopPropagation()}} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button onClick={(event)=>{event.stopPropagation(); DeleteHandler(note._id)}}  type="button" data-dismiss="modal" class="btn btn-danger">Удалить</button>
            </div>
            </div>
        </div>
        </div>
    </>  
  )
}
