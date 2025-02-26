import { NextResponse } from "next/server";
import admin from 'firebase-admin'
import { auth } from "@/app/firebase";
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
            clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
            privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY.replace(/\\n/g, "\n"),
        }),
    });
}

const authAdmin = admin.auth(); // ✅ Server-side auth

import { getRefreshedToken } from "@/app/util/getRefeshToken";

export async function POST(req) {
    try {
        const { token } = await req.json();
        const decodedToken = await authAdmin.verifyIdToken(token);
        // console.log('from middleware : ', decodedToken)
        const SEC = 1000
        const MIN = 60 * SEC
        
        const expTime = decodedToken.exp
        const expireDate = new Date(expTime * 1000)
        const currentDate = new Date()
        const expireMinute = Math.floor((expireDate - currentDate) / MIN)

        // if(expireMinute > 30) {
        //     const response = await getRefreshedToken()
        //     console.log('refesh token success :', response)
        // }

        // console.log('expire date : ', expireDate)
        // console.log('current date : ', currentDate)
        // console.log('expire minute : ', expireMinute)
        return NextResponse.json({ success: true, user: decodedToken });
    } catch (error) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
}     