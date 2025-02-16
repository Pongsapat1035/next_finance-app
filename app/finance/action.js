"use server"
import { headers } from "next/headers"

export async function getUserInfo() {
    const headerRequest = await headers()
    const userInfo = JSON.parse(headerRequest.get('user'))
    console.log('check user ', userInfo)
    return userInfo
}