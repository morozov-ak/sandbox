import React, { useState, useEffect,useContext } from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useHistory } from 'react-router-dom'

export const NotesList = ({ notes }) => {
  const {request} = useHttp()
  const history = useHistory()
    const auth = useContext(AuthContext)
    
    const DeleteHandler = async (id) => {
      try{
        console.log("Удаляется: ", id)
        const data = await request('/api/note/deleteNote','POST', {noteNameId:id},{
                authorization: `Bearer ${auth.token}`
            })
        console.log("Удалено: ", id, data)
        
          
         
          
      }
      catch(err){console.log(err)}
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
            {/* <td>
              <Link to={`/detail/${note._id}`}>Открыть</Link>
            </td> */}
            
              <button onClick={()=>{DeleteHandler(note._id)}} className="btn btn-danger"  type="button"  id="button-addon2">Удалить</button> 
            


            
          </tr>
        )
      }) }
      </tbody>
    </table>
      </div>
    
  )
}
