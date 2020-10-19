import React, {  useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'



export const UsersShareList = ({allUserList=[],noteEdit}) => {

const { Create,UsersListToSave } = useContext(AuthContext)
var users=noteEdit.shared

console.log("Выпадающее меню",allUserList)
console.log("Выпадающее меню users:",users)

// useEffect(
//     ()=>{
//         if(allUserList){
//         console.log("useEffect",allUserList)
//         allUserList.map((user)=>{
//             var chState=false
//             if(users.includes(user._id)){chState=true}
//             var check=document.getElementById(user._id)
//             check.checked=chState
//             console.log("Checked?: ",check.checked)
//     })
//     }
//     },[allUserList]    
// )



const checkHandler=user=>{
    var varcheckbox=document.getElementById(user._id);
    if(varcheckbox.checked)
    {
        console.log("allUserList меню",allUserList)
        console.log("########################################")
        console.log("document.getElementById(user._id).checked",document.getElementById(user._id).checked)
        if(!users.includes(user._id)){users=[...users,user._id]}
        console.log("После добавления     :",users)
        const m = Create(users)
        //console.log("m     :",m)
        console.log("document.getElementById(user._id).checked",document.getElementById(user._id).checked)
        setTimeout(()=>{document.getElementById(user._id).checked=true},0)
        //document.getElementById(user._id).checked=true
        console.log("document.getElementById(user._id).checked",document.getElementById(user._id).checked)
        
    }
    else{
        users.splice(users.indexOf(user._id),1)
        console.log("После удаления:",users)
        Create(users)
        setTimeout(()=>{document.getElementById(user._id).checked=false},0)
        //document.getElementById(user._id).checked=false
        
        
    }
}


if(allUserList){
    
    return(
            
            allUserList.map((user)=>{
                
                var chState=false
                if(users.includes(user._id)){chState=true}
                    return(
                        <div className="form-check" key={user._id}>
                            <input onChange={()=>{checkHandler(user)}} className="form-check-input" type="checkbox" value={user._id} id={user._id} 
                            checked={chState}
                            ></input>
                            <label className="form-check-label" htmlFor={user._id}>
                                {user.name}
                            </label>
                            
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
