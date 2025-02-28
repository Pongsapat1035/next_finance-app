"use client"
import { createContext, useContext, useState, useEffect } from 'react'
import { getUserInfo } from './action'
import { auth } from '../firebase'
import { storeCookie } from '../auth/action'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState('')

    const fetchUserInfo = async () => {
        const userInfo = await getUserInfo()
        console.log('expire minute : ', userInfo.expire)
        // if token expire time < 20 refesh token
        if (userInfo.expire < 20) {
            const newToken = await auth.currentUser.getIdToken(true)
            await storeCookie(newToken)
        }
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