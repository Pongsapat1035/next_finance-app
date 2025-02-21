"use client"

import { userSignout } from "../auth/action"
import { AuthProvider } from './authContext'
import Navbar from "../components/navbar/Navbar"

import { useAlert } from "../alertContext"
import { useRouter } from "next/navigation"

export default function HomeLayout({ children }) {
    const router = useRouter()
    const { handleAlert } = useAlert()

    const handleSignout = async () => {
        try {
            //signout and redirect to home page
            const { status } = await userSignout()
            if (status) {
                console.log('user sign out')
            }
            handleAlert('success', 'logout success !')
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
