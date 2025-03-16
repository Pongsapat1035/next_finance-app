"use server"
import { headers } from "next/headers"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"

// get user data from header
export async function getUserInfo() {
    const headerRequest = await headers()
    const userInfo = JSON.parse(headerRequest.get('user'))
    return userInfo
}

// load user config
export async function loadUserConfig(userId) {
    try {
        const docRef = doc(db, "userConfig", userId);
        const querySnapshot = await getDoc(docRef);
        const result = querySnapshot.data()
        return result
    } catch (error) {
        console.log('error')
    }
}