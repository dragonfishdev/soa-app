import { useState, useCallback, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const baseUrl = "http://localhost:8080"

export const useHttp = () => {
  const { login, accessToken, refreshToken, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true)
    try {
      headers['Authorization'] = `Bearer ${accessToken}`;
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }

      let response = await fetch(baseUrl + url, { method, body, headers })
      let data = await response.json()
        
      if (!response.ok) {
        if (response.status === 403 && data.details === 'jwt expired') {
          const authResponse = await fetch(baseUrl + '/api/auth/refresh-token', {
            method: 'POST',
            body: JSON.stringify({ refreshToken }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          data = await authResponse.json()

          if (!authResponse.ok) {
            throw new Error(data.message || 'Что-то пошло не так')
          }

          login(data.accessToken, refreshToken, user);

          headers['Authorization'] = `Bearer ${data.accessToken}`;
          response = await fetch(baseUrl + url, { method, body, headers })
          data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Что-то пошло не так')
          }
        } else {
          throw new Error(data.message || 'Что-то пошло не так')
        }
      }

      setLoading(false)

      return data
    } catch (e) {
      setLoading(false)
      setError(e.message)
      throw e
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return { loading, request, error, clearError }
}