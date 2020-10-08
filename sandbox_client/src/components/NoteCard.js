import React, { useState, useContext, useEffect } from 'react'
import { AuthContext, shareUsers } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useHistory } from 'react-router-dom'
import { UsersShareList } from './UsersShareList'
//import {Loader} from '../components/Loader'
//import { useMessage } from '../hooks/popup'


export const NoteCard = ({ note , users}) => {
  const history = useHistory()
  const { loading, request } = useHttp()
  const { message2 } = useContext(AuthContext)
  const auth = useContext(AuthContext)
  var {userList2} = useContext(shareUsers)
  

  const [noteEdit, setNoteEdit] = useState({
    noteNameId: note._id, noteNameEdit: note.name, noteTextEdit: note.notetext,shared:note.shared
  })

  const DeleteHandler = async () => {
    try {
      await request('/api/note/deleteNote', 'POST', { ...noteEdit }, {
        authorization: `Bearer ${auth.token}`
      })

      message2(`Удалено: ${noteEdit.noteNameEdit}`)
      history.goBack()
    }
    catch (err) { console.log(err) }
  }

  const changeHandler = event => {
    setNoteEdit({ ...noteEdit, [event.target.name]: event.target.value })
  }




  const createHandler = async () => {
    try {
      console.log("Список юзеров на сохранение:",userList2)
      console.log("Список юзеров на сохранение:",noteEdit)
      await request('/api/note/save', 'POST', { ...noteEdit, userList2 }, {
        authorization: `Bearer ${auth.token}`
      })
      message2('Сохранено')


    }
    catch (err) { console.log(err) }
  }
  console.log("Юзеры переданные:",users)
  if (loading) {
    let btn = document.getElementById('button-save')
    btn.className = "btn btn-danger"
    btn.disabled = 'false'

  }
  if (!loading) {
    if (document.getElementById('button-save')) {
      let btn = document.getElementById('button-save')
      btn.className = "btn btn-success"
      btn.removeAttribute("disabled")
    }
  }


  return (
    <>
      <div className="input-group mb-3">
        <input onChange={changeHandler} value={noteEdit.noteNameEdit} name="noteNameEdit" id="noteNameEdit" className="form-control" />
        <div className="input-group-append">
          <button onClick={createHandler} className="btn btn-success" type="button" id="button-save" >Сохранить</button>
        </div>
      </div>

      <p>Дата создания: <strong>{new Date(note.date).toLocaleDateString()}</strong></p>

      <textarea onChange={changeHandler} value={noteEdit.noteTextEdit} name="noteTextEdit" id="noteTextEdit" className="form-control" aria-label="With textarea"></textarea>
      {/* <button onClick={DeleteHandler} className="btn btn-danger"  type="button"  id="button-delete">Удалить</button> */}
      
      
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Расшарить заметку
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <UsersShareList users={users}/>
        </div>
      </div>

      <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModal">
        Удалить
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Удалить заметку: {note.name} ???
      </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button onClick={DeleteHandler} type="button" data-dismiss="modal" className="btn btn-danger">Удалить</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )


}
