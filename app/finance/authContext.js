"use client"
import { createContext, useContext, useState, useEffect } from 'react'
import { getUserInfo } from './action'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState('')

    const fetchUserInfo = async () => {
        const userInfo = await getUserInfo()
        setUser(userInfo)
    }

    useEffect(() => {
        fetchUserInfo()
    }, [])

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)