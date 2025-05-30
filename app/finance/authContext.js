import { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '@/app/firebase'

import { storeCookie } from '@/app/auth/action'
import { getUserInfo, loadUserConfig } from '@/app/finance/action'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState('')
    const [userConfig, setUserConfig] = useState({
        expend: [],
        income: [],
        spendingLimit: 0
    })

    const fetchUserInfo = async () => {
        const userInfo = await getUserInfo()

        if (userInfo.uuid) {
            const config = await loadUserConfig(userInfo.uuid)
            setUserConfig(config)
        }

        // // if token expire time < 20 refesh token
        // if (userInfo.expire < 20) {
        //     const newToken = await auth.currentUser.getIdToken(true)
        //     await storeCookie(newToken)
        // }

        setUser(userInfo)
    }

    useEffect(() => {
        fetchUserInfo()
    }, [])

    return (
        <AuthContext.Provider value={{ user, userConfig, setUserConfig }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)