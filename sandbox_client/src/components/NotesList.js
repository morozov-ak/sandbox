import React, { useContext } from 'react'
import {AuthContext} from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useHistory } from 'react-router-dom'

export const NotesList = ({ notes }) => {
  const {request} = useHttp()
  const {message2} = useContext(AuthContext)
  const history = useHistory()
    const auth = useContext(AuthContext)
    
    const DeleteHandler = async (id,event) => {
      try{
        
        //console.log("Удаляется: ", id,event)
        await request('/api/note/deleteNote','POST', {noteNameId:id},{
                authorization: `Bearer ${auth.token}`
        })
        message2("Удалено")
        
            
      }
      catch(err){console.log(err)}
      history.push(`/Create`)
      history.push(`/Notes`)
  }
  


  if (!notes.length) {
    return <p className="center">Ссылок пока нет</p>
  }

  return (
      <div id='table'>
        <table>
      <thead>
      <tr>
        <th>№</th>
        <th>Заголовок</th>
        <th>Текст</th>
        <th>Дата создания</th>
      </tr>
      </thead>

      <tbody>
      { notes.map((note, index) => {
          
          
        return (
          <tr key={note._id} 
          onClick={()=>{history.push(`/detail/${note._id}`)}} 
          >
            <td>{index + 1}</td>
            <td>{note.name}</td>
            <td>{note.notetext}</td>
            <td>{new Date(note.date).toLocaleDateString()}</td>
            <td>
            <button onClick={(event)=>{event.stopPropagation(); DeleteHandler(note._id)}} className="btn btn-danger"  type="button"  id="button-addon2">Удалить</button>
            </td>
               
            


            
          </tr>
        )
      }) }
      </tbody>
    </table>
      </div>
    
  )
}
