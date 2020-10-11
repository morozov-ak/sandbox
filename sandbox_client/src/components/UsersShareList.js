import React, { useState, useContext, useEffect } from 'react'
import { AuthContext,shareUsers } from '../context/AuthContext'

export const UsersShareList = ({allUserList=[],noteEdit}) => {

const { message2,Create,UsersListToSave } = useContext(AuthContext)
var users=noteEdit.shared

console.log("Выпадающее меню",allUserList)
console.log("Выпадающее меню users:",users)



const checkHandler=user=>{
    var varcheckbox=document.getElementById(user._id);
    if(varcheckbox.checked)
    {
        if(!users.includes(user._id)){users=[...users,user._id]}
        console.log("После добавления     :",users)
        //varcheckbox.checked=false
        
    }
    else{
        users.splice(users.indexOf(user._id),1)
        console.log("После удаления:",users)
        // varcheckbox.checked=false
        // varcheckbox.removeAttribute("checked")
        // varcheckbox.checked=false
        
    }
}

const sendDatShit=(users)=>{
    console.log("sendDatShit UsersListToSave users:",users)
    Create(users)
    console.log("sendDatShit UsersListToSave:",UsersListToSave)
    
}







if(allUserList){
    
    return(
            
            allUserList.map((user)=>{
                // var chState=false
                // if(users.includes(user._id)){chState=true}
                    return(
                        <div className="form-check" key={user._id}>
                            <input onChange={()=>{checkHandler(user)}} className="form-check-input" type="checkbox" value={user._id} id={user._id} 
                            //checked={chState}
                            ></input>
                            <label className="form-check-label" htmlFor={user._id}>
                                {user.name}
                            </label>
                            <button onClick={sendDatShit} type="button" data-dismiss="modal" className="btn btn-danger">Удалить</button>
                        </div>
                    )
            }
        )
        
    )
}

return (
    <p>Нет юзеров</p>
)


}
