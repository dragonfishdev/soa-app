import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [user, setUser] = useState(null)

  const login = useCallback((accessToken, refreshToken, user) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUser(null);

    localStorage.setItem(storageName, JSON.stringify({
      user, accessToken, refreshToken
    }));
  }, [])

  const logout = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);

    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.accessToken) {
      login(data.accessToken, data.refreshToken, data.user)
    }
    setReady(true)
  }, [login])


  return { login, logout, accessToken, refreshToken, user, ready }
}