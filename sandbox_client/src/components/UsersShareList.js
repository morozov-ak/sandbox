import React, { useState, useContext } from 'react'
import { AuthContext,shareUsers } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useHistory } from 'react-router-dom'
//import {Loader} from '../components/Loader'
//import { useMessage } from '../hooks/popup'


export const UsersShareList = ({users}) => {
const history = useHistory()
const { loading, request } = useHttp()
const { message2 } = useContext(AuthContext)
const auth = useContext(AuthContext)
var userList2 = useContext(shareUsers)

const [userList, setUserList] = useState([])


console.log("USL:",users)

const checkHandler=user=>{
var varcheckbox=document.getElementById(user._id);
if(varcheckbox.checked)
{
    console.log('Добавить пользователя',user._id)
    console.log(userList2.userList2)
    userList2.userList2=[...userList2.userList2,user._id]
    console.log(userList2.userList2)
    
}
else{
    message2(`расчекано ${user.name}`);
    console.log("Поиск",userList2.userList2.indexOf(user._id))
    console.log("Удалена:",userList2.userList2.splice(userList2.userList2.indexOf(user._id),1))
    console.log("Список юзеров:",userList2.userList2)
    //userList2.userList2=[...userList]
}


}

if(users){
    return(
        users.map((user)=>{return(
            <div class="form-check" key={user._id}>
            <input onChange={()=>{checkHandler(user)}} class="form-check-input" type="checkbox" value={user._id} id={user._id}></input>
            <label class="form-check-label" for={user._id}>
                {user.name}
            </label>
        </div>
        )})
    )
    
}


return (
    <a>Нет юзеров</a>
)


}
