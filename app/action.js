"use server"
import { cookies } from "next/headers";

export async function storeCredential(uid) {
    const cookieStore = await cookies()
    cookieStore.set({
        name: 'auth',
        value: uid,
        maxAge: '3000'
    })
    console.log('set cookies')
}

export async function deleteCookie() {
    const cookieStore = await cookies()
    cookieStore.delete('auth')
    console.log('delete cookies')

}