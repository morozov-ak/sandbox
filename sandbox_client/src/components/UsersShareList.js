import React, { useContext,useState,useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'



export const UsersShareList = ({ allUserList = [], noteEdit,UsersListToSave, setUsersListToSave }) => {
    
    //const { setUsersListToSave, UsersListToSave } = useContext(AuthContext)
    
    useEffect(() => {

        console.log("allUserList",allUserList)
        console.log("noteEdit.shared",noteEdit.shared)
        
        setUsersListToSave(noteEdit.shared)
        if(noteEdit.shared==undefined){console.log("fk");setUsersListToSave({})}
    }, [])
    
    


    const checkHandler = async (event, user) => {
        
            console.log(user._id, event.target.checked)
            event.persist()
            if(event.target.checked==false){
                setUsersListToSave((prev)=>{
                    console.log(prev)
                    delete prev[user._id]
                    console.log(prev)
                    return {...prev}})
            }
            else{
                setUsersListToSave((prev)=>{ return {...prev, [user._id]: event.target.checked} })
            }
            
            //setUsersListToSave({...UsersListToSave, [user._id]: event.target.checked})
            
            console.log("UsersListToSave", UsersListToSave)
            
    }

        
    
    
    
    



    if (allUserList) {

        return (

            allUserList.map((user) => {

                return (
                    
                    <div className="form-check" key={user._id}>
                        <input onChange={(event) => { checkHandler(event, user) }} className="form-check-input" type="checkbox" value={user._id} id={user._id}
                            //checked={UsersListToSave[user._id]?true:false}
                            checked={Boolean(UsersListToSave[user._id])}
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

    return (<p>Нет юзеров</p>)


}
