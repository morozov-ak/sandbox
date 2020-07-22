import React from 'react'
import {Link} from 'react-router-dom'

export const NotesList = ({ notes }) => {
  if (!notes.length) {
    return <p className="center">Ссылок пока нет</p>
  }

  return (
      <div>
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
          <tr key={note._id} >
            <td>{index + 1}</td>
            <td>{note.name}</td>
            <td>{note.notetext}</td>
            <td>{new Date(note.date).toLocaleDateString()}</td>
            <td>
              <Link to={`/detail/${note._id}`}>Открыть</Link>
            </td>

            
          </tr>
        )
      }) }
      </tbody>
    </table>
      </div>
    
  )
}
