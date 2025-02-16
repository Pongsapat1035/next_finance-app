"use client"

import { userSignout } from "../auth/action"
import { AuthProvider } from './authContext'
import Navbar from "../components/navbar/Navbar"

export default function HomeLayout({ children }) {

    const handleSignout = async () => {
        try {
            //signout and redirect to home page
            const { status } = await userSignout()
            if (status) {
                console.log('user sign out')
            }
            alert('logout success !!')
            router.push('/')
        } catch (error) {
            console.log('signout error : ', error)
        }
    }

    return (
        <>
            <AuthProvider>
                <Navbar signOut={handleSignout}></Navbar>
                {children}
            </AuthProvider>
        </>
    )
}
