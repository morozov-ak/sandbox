import React, { useContext } from 'react'
import {AuthContext} from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useHistory } from 'react-router-dom'

export const NotesList = ({ notes }) => {
  const {loading, request} = useHttp()
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
    <div id='table' className='table'>
      <table>
         <thead>
          <tr>
            <td className='col1'>№</td>
            <td className='col2'>Заголовок</td>
            {/* <th className='col3'>Текст</th> */}
            <td className='col4'>Дата создания</td>
            <td className='col5'></td>
          </tr>
        </thead>  
        <tbody>
          { notes.map((note, index) => {
            return (
              <>
              {/* <tr key={note._id } className='tbody'
              onClick={()=>{history.push(`/detail/${note._id}`)}} 
              >
                <td className='col1'>{index + 1}</td>
                <td className='col2'>{note.name}</td>
                <td className='col3'>{note.notetext}</td>
                <td className='col4'>{new Date(note.date).toLocaleDateString()}</td>
                <td className='col5'>
                <button onClick={(event)=>{event.stopPropagation(); DeleteHandler(note._id)}} className="btn btn-danger"  type="button"  id="button-addon2">Удалить</button>
                </td>
              </tr> */}
              <tr key={note._id } className='tbody' 
              onClick={()=>{history.push(`/detail/${note._id}`)}} 
              >
                <td className='col1'>{index + 1}</td>
                <td className='col2'>{note.name}</td>
                
                <td className='col4'>{new Date(note.date).toLocaleDateString()}</td>
                <td className='col5'>
                <button onClick={(event)=>{event.stopPropagation(); DeleteHandler(note._id)}} className="btn btn-danger"  type="button"  id="button-addon2">Удалить</button>
                </td>
              </tr>
              <tr>
                <td className='col3' colspan="4">{note.notetext}</td>
              </tr>
              </>

              
            )
          }) }
        </tbody>
    </table>
  </div>
    
  )
}
