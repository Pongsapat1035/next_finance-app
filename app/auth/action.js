"use server"
import { cookies } from "next/headers";
import { auth, db } from '../firebase'

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export async function Login(userData) {
    const { email, password } = userData
    try {
        const response = await signInWithEmailAndPassword(auth, email, password)
        const token = await response.user.getIdToken()
        storeCookie(token)
        return { status: true, message: `login success!!`, token }

    } catch (error) {
        console.log('login error : ', error)
        return { status: false, message: error }
    }
}

export async function Register(userData) {
    const { email, password, name } = userData
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password)
        const updateUserInfo = await updateProfile(auth.currentUser, {
            displayName: name
        })
        const token = await response.user.getIdToken()
        console.log(response)
        storeCookie(token)
        CreateUserConfig(response.user.uid)
        console.log(response)
        return { status: true, message: `Register success!!"`, token }

    } catch (error) {
        console.log('register error : ', error)
        return { status: false, message: error }
    }
}

export async function CreateUserConfig(userId) {
    try {
        // console.log('check recieved id : ', userId)
        const defaultCategory = {
            expend: ['shopping', 'entertainment', 'grocery'],
            income: ['salary', 'specail'],
            spendingLimit: 10000
        }
        const response = await setDoc(doc(db, 'userConfig', userId), defaultCategory)
        console.log('resposne set default cate : ', response)
    } catch (error) {
        console.log('create default category error : ', error)
    }
}


export async function storeCookie(token) {
    cookies().set("authToken", token, { httpOnly: true, secure: true });
    console.log('store cookie success')
    return true
}

export async function deleteCookie() {
    const cookieStore = await cookies()
    cookieStore.delete('authToken')
    console.log('delete cookies success')
}

export const userSignout = async () => {
    try {
        //signout and redirect to home page
        await signOut(auth)
        await deleteCookie()
        return { status: 'success' }
    } catch (error) {
        console.log('signout error : ', error)
    }
}