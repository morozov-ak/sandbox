import {useState, useCallback} from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const useHttp =() =>{
    const [loading, setLoading] = useState(false)
    const [error,setError] = useState(null)
    const auth = useContext(AuthContext)
    const request = useCallback(async(url,method='GET',body=null,headers = {})=>{
        setLoading(true)
        try {
            console.log('body:', body,'method:',method,'url:',url)
            if(body){
                console.log('stringify')
                body =JSON.stringify(body)
                headers['Content-Type']='application/json'
            }

            const response = await fetch(url,{method,body,headers})
            const data = await response.json() 
            console.log("data",data)
            if(!response.ok){
                console.log("data.e.message",data.e.message)
                if(data.e.message==="jwt expired"){
                    console.log("Надо бы логаут")
                    auth.logout()
                    
                }
                throw new Error(data.message||'Что-то пошло не так')
            }
            setLoading(false)
            return data
        }
        catch(e){
            setLoading(false)
            setError(e.message)
            console.log("useHttp",e.message)
            throw e
            
        }
    },[auth])
    const clearError = useCallback(() => {setError('');console.log('бляяяять',error)}, [error])
    return { loading, request, error, clearError }
} 