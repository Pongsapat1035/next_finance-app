"use client"
import { auth } from "../firebase"
import { signOut } from "firebase/auth"
import { useRouter } from 'next/navigation'
import { deleteCookie } from "../action"
export default function HomeLayout({ children }) {
    const router = useRouter()

    const signoutClick = async () => {
        try {
            //signout and redirect to home page
            await signOut(auth)
            await deleteCookie()
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