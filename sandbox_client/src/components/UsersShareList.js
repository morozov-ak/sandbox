import React, {  useEffect,useCallback } from 'react'
//import { AuthContext } from '../context/AuthContext'



export const UsersShareList = ({ allUserList = [], noteEdit, UsersListToSave, setUsersListToSave }) => {

    //const { setUsersListToSave, UsersListToSave } = useContext(AuthContext)

    useEffect(() => {

        console.log("allUserList", allUserList)
        console.log("noteEdit.shared", noteEdit.shared)

        setUsersListToSave(noteEdit.shared)
        //if(noteEdit.shared==undefined){console.log("fk");setUsersListToSave({})}
    },[noteEdit.shared])

    
    useEffect(() => {

        console.log("UsersListToSave изменен", UsersListToSave)
        
    },[UsersListToSave])




    const checkHandler = async (event, user) => {
            console.log("Хэндлер НАЖАЛ")
            event.persist()
            if(event.target.checked===false){
                console.log("Удаление")
                setUsersListToSave((prev)=>{
                    if(prev.indexOf(user._id)==-1){console.log("Повторный вызов");return prev}
                    console.log("Удаление prev:",prev)
                    console.log("Удаление prev:",prev.indexOf(user._id))
                    prev.splice(prev.indexOf(user._id),1)
                    console.log("Удаление prev:",prev)
                    return [...prev]
                })
            }
            else{
                console.log("Внесение")
                setUsersListToSave((prev)=>{
                    if(prev.indexOf(user._id)!==-1){console.log("Повторный вызов");return prev}
                    console.log("Внесение prev:",prev)
                    return [...prev, user._id]
                })
            }
    }

    // const checkHandler = useCallback(async (event, user) => {
    // console.log("Хэндлер")
    // event.persist()
    // if(event.target.checked==false){
    //     console.log("Удаление")
    //     setUsersListToSave((prev)=>{
    //         console.log("Удаление prev:",prev)
    //         console.log("Удаление prev:",prev.indexOf(user._id))
    //         prev.splice(prev.indexOf(user._id),1)
    //         console.log("Удаление prev:",prev)
    //         return [...prev]
    //     })
    // }
    // else{
    //     console.log("Внесение")
    //     setUsersListToSave((prev)=>{
    //         console.log("Внесение prev:",prev)
    //         return [...prev, user._id]
    //     })
    // }
    // }, [setUsersListToSave])





    if (allUserList) {

        return (

            allUserList.map((user) => {

                return (

                    <div className="form-check" key={user._id}>
                        <input onChange={(event) => { checkHandler(event, user) }} className="form-check-input" type="checkbox" value={user._id} id={user._id}
                            checked={UsersListToSave.includes(user._id)}
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
