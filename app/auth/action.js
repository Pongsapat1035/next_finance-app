"use server"
import { cookies } from "next/headers";


export async function storeCredential(uid) {
    const cookieStore = await cookies()
    cookieStore.set('auth', uid)
    console.log('set cookies')
}

export async function deleteCookie() {
    const cookieStore = await cookies()
    cookieStore.delete('auth')
    console.log('delete cookies')

}