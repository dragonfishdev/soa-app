import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [user, setUser] = useState(null)

  const login = useCallback((jwtToken, user) => {
    setToken(jwtToken)
    setUser(user)

    localStorage.setItem(storageName, JSON.stringify({
      user, token: jwtToken
    }))
  }, [])


  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      login(data.token, data.userId)
    }
    setReady(true)
  }, [login])


  return { login, logout, token, user, ready }
}