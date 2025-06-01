"use server"
import { cookies } from "next/headers";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

import { auth, db } from '../firebase'

export async function Login(userData) {
    const { email, password } = userData
    try {
        const response = await signInWithEmailAndPassword(auth, email, password)
        const token = await response.user.getIdToken()
        const name = response.user.displayName
        storeCookie(token)
        return { status: 200, message: `login success!!`, name }
    } catch (error) {
        console.log('login error : ', error.code)
        const errorCode = error.code
        let message = error.message
        if (errorCode === "auth/user-not-found") message = "User not  found"
        return { status: 400, message }
    }
}

export async function Register(userData) {
    const { email, password, name } = userData
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password)
        // update display name
        await updateProfile(auth.currentUser, { displayName: name })
        const token = await response.user.getIdToken()
        const userId = response.user.uid
        storeCookie(token)
        CreateUserConfig(userId)

        return { status: 200, message: `Register success!!"`, name }

    } catch (error) {
        console.log('register error : ', error.code)
        if (error.code === "auth/email-already-in-use") {
            return { status: 409, message: "Email is already in use" }
        }

        return { status: false, message: error }
    }
}

export async function CreateUserConfig(userId) {
    try {
        const docRef = doc(db, "userConfig", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return
        } else {
            const defaultCategory = {
                expend: ['Housing', 'Food', 'Groceries', 'Transportation', 'Entertainment', 'Health'],
                income: ['Salary', 'Wages', 'Side Hustles', 'Investment', 'Gifts', 'Other'],
                spendingLimit: 10000
            }
            await setDoc(doc(db, 'userConfig', userId), defaultCategory)
        }
    } catch (error) {
        console.log('create default category error : ', error)
    }
}

export async function storeCookie(token) {
    await cookies().set("authToken", token, { httpOnly: true, secure: true });
}

export async function deleteCookie() {
    const cookieStore = await cookies()
    cookieStore.delete('authToken')
}

export const userSignout = async () => {
    try {
        //signout and redirect to home page
        await signOut(auth)
        await deleteCookie()
        return { status: 200, message: 'logout success', redirectUrl: "/" }
    } catch (error) {
        console.log('signout error : ', error)
    }
}

