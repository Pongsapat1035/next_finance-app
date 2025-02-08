import admin from 'firebase-admin'
// const serviceAccount = require("path/to/serviceAccountKey.json");
if (!admin.apps.length) {

admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
      privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

export const authAdmin = admin.auth(); // ✅ Server-side auth

