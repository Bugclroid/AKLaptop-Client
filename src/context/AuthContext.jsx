import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('aklaptop_auth')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed?.token) {
          setToken(parsed.token)
          setUser(parsed.user || null)
        }
      } catch {}
    }
  }, [])

  function login(data) {
    const payload = { token: data.token, user: data.user }
    setToken(payload.token)
    setUser(payload.user || null)
    localStorage.setItem('aklaptop_auth', JSON.stringify(payload))
  }

  function logout() {
    setToken(null)
    setUser(null)
    localStorage.removeItem('aklaptop_auth')
  }

  const value = useMemo(() => ({ token, user, login, logout }), [token, user])

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

