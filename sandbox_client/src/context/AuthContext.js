import {createContext} from 'react'

function noop(){}

// function popupMessage(mes){
//     console.log(mes)
// }

export const AuthContext = createContext({
    token:null,
    userId:null,
    login:noop,
    logout:noop,
    message2:noop,
    isAuthenticated:false
})

export const shareUsers = createContext({
    userList2:[]
})