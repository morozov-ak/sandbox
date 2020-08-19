import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken)
    setUserId(id)

    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem(storageName)
  }, [])
  
  const message2 = useCallback((mes) => {
    if (!document.getElementById('popup_container')){
      console.log("Создаем контейнер для попапа")
      let div = document.createElement('div')
      div.id="popup_container"
      document.getElementById('root').append(div)
    }
    console.log("Контейнер для попапа существует или создан")
    let div = document.createElement('div')
    div.id="snackbar"
    div.className="show"
    div.textContent = mes;
      console.log(mes)
    
    document.getElementById('popup_container').append(div)
    
    setTimeout(()=>{
      div.remove()
      console.log("Длина чилдренов:", document.getElementById('popup_container').children.length)
      console.log("удалить???", document.getElementById('popup_container').children.length)
      if (document.getElementById('popup_container')&&!document.getElementById('popup_container').children.length){document.getElementById('popup_container').remove()}
    },3000)
  
  }, [])
  


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      login(data.token, data.userId)
    }
    setReady(true)
  }, [login])


  return { login, logout,message2, token, userId, ready }
}
