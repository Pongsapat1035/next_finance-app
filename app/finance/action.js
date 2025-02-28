"use server"
import { headers } from "next/headers"

// get user data from header
export async function getUserInfo() {
    const headerRequest = await headers()
    const userInfo = JSON.parse(headerRequest.get('user'))
    return userInfo
}