import React, { createContext, useState, useEffect } from 'react'
import api from './api'
import { addToStorage, getFromStorage, removeFromStorage } from './storage'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState('')

  useEffect(() => {
    function loadStorageData() {
      const storagedToken = getFromStorage('@PdR:token')
      const storagedUser = getFromStorage('@PdR:user')

      if (storagedToken && storagedUser) {
        setToken(storagedToken)
        setUser(JSON.parse(storagedUser))
        setIsAuthenticated(true)
      }
    }

    loadStorageData()
  }, [])

  function logout() {
    removeFromStorage('@PdR:token')
    removeFromStorage('@PdR:user')

    setToken('')
    setUser(null)
    setIsAuthenticated(false)
  }

  async function login(email, password, remember) {
    try {
      const response = await api.post('/api/v1/login', { email: email, password: password })

      const token = response.data.token
      const user = {
        id: response.data.id,
        firstName: response.data.firstName ?? '',
        lastName: response.data.lastName ?? '',
      }

      setToken(token)
      setUser(user)

      const saveToSessionStorage = !(remember === 'remember')
      addToStorage('@PdR:token', token, saveToSessionStorage)
      addToStorage('@PdR:user', user, saveToSessionStorage)

      setIsAuthenticated(true)
    } catch (error) {
      throw error.response.data.msg ? error.response.data.msg : error.message
    }
  }

  return <AuthContext.Provider value={{ isAuthenticated: isAuthenticated, token: token, user: user, login, logout }}>{children}</AuthContext.Provider>
}

export default AuthContext
