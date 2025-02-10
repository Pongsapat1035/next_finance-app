import { NextResponse } from "next/server";
import admin from 'firebase-admin'

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



export async function POST(req) {
    try {
        const { token } = await req.json();
        const decodedToken = await authAdmin.verifyIdToken(token);
        return NextResponse.json({ success: true, user: decodedToken });
    } catch (error) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
}     