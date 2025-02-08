import { authAdmin } from "@/app/firebase-admin"
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { token } = await req.json();
        const decodedToken = await authAdmin.verifyIdToken(token);
        return NextResponse.json({ success: true, user: decodedToken });
    } catch (error) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
}     