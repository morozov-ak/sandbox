import React, { useContext } from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
//import {Nav} from 'react-bootstrap'


export const Navbar = ()=>{
  const history=useHistory()
   const auth = useContext(AuthContext)

   const logoutHandler = event => {
     event.preventDefault()
     auth.logout()
     history.push('/')
   }

return(
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">SandBOX</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item"><NavLink to="/Notes" className="nav-link">Заметки</NavLink></li>
      
      <li className="nav-item"><NavLink to="/Create" className="nav-link">Создать</NavLink></li>
      
      <div>
      <li className="nav-item">
        <a className="nav-link" onClick={logoutHandler}>Выйти</a>
      </li>
      </div>
      
    </ul>
  </div>
</nav>



)


}