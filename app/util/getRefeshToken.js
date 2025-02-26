import { auth } from "@/app/firebase";

async function getRefreshedToken() {
    const user = auth.currentUser;
    if (user) {
        const token = await user.getIdToken(true);
        return token;
    }
    throw new Error("User not authenticated");
}

export { getRefreshedToken }