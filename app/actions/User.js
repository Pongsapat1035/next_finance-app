"use server"
import { auth } from '../firebase'
import { signOut, onAuthStateChanged } from "firebase/auth";


export async function Register(user) {
    console.log('register')
    console.log(user)
    return

}

export async function Login(user) {
    console.log('login')
    console.log(user)
    return
}

export async function SignOut() {
    try {
        const result = await signOut(auth)
        console.log('logout result : ', result)
        CheckAuth()
    } catch (error) {
        console.log(error)
    }
}
export async function CheckAuth() {

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            return uid
        } else {
            console.log('user sign out')
        }
    });
}