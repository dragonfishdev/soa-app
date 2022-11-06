import { createContext } from 'react'

function noop() {}

export const AuthContext = createContext({
  accessToken: null,
  refreshToken: null,
  user: null,
  login: noop,
  logout: noop,
  isAuthenticated: false
})