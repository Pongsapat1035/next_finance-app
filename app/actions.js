"use server"
import { cookies } from "next/headers";

export async function storeCredential(accessToken) {
    const cookieStore = await cookies()
    cookieStore.set({
        name: 'auth',
        value: accessToken,
        maxAge: 86400
    })
    console.log('set cookies')
}

export async function deleteCookie() {
    const cookieStore = await cookies()
    cookieStore.delete('auth')
    console.log('delete cookies')

}