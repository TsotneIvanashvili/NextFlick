import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem('nextflick_users')) ?? []
  } catch {
    return []
  }
}

function readSession() {
  try {
    return JSON.parse(localStorage.getItem('nextflick_session'))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readSession)

  const persist = (session) => {
    localStorage.setItem('nextflick_session', JSON.stringify(session))
    setUser(session)
  }

  const signup = ({ name, email, password }) => {
    const users = readUsers()
    const normalized = email.trim().toLowerCase()
    if (users.some((u) => u.email === normalized)) {
      throw new Error('An account with this email already exists')
    }
    localStorage.setItem(
      'nextflick_users',
      JSON.stringify([...users, { name: name.trim(), email: normalized, password }]),
    )
    persist({ name: name.trim(), email: normalized })
  }

  const login = ({ email, password }) => {
    const normalized = email.trim().toLowerCase()
    const account = readUsers().find((u) => u.email === normalized && u.password === password)
    if (!account) throw new Error('Invalid email or password')
    persist({ name: account.name, email: account.email })
  }

  const logout = () => {
    localStorage.removeItem('nextflick_session')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
