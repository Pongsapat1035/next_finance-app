"use client"

import { useRouter } from 'next/navigation'
import { userSignout } from "../auth/action"

export default function HomeLayout({ children }) {
    const router = useRouter()
    const signoutClick = async () => {
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
            <div>
                Header
                <button onClick={() => signoutClick()}>logout</button>
                <button onClick={() => router.push('/')}>goto home page</button>
            </div>
            {children}
        </>
    )
}