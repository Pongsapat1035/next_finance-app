"use server"
import { doc, collection, getDoc, arrayUnion, arrayRemove, getDocs, addDoc, deleteDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

export async function LoadUserConfig(userId) {
    try {
        const docRef = doc(db, "userConfig", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.log('load user config error : ', error)
    }
}

export async function AddCategory(type, data, id) {
    try {
        const docRef = doc(db, "userConfig", id)
        const response = await updateDoc(docRef, {
            [type]: arrayUnion(data)
        });
        return { status: 200, message: "Add new category success" }
    } catch (error) {
        console.log('error from add cate : ', error)
        return { status: 400, message: error.message }
    }
}

export async function DeleteCategory(type, data, id) {
    try {
        const docRef = doc(db, "userConfig", id)
        await updateDoc(docRef, {
            [type]: arrayRemove(data)
        });
        return { status: 200, message: `Delete ${data} success` }
    } catch (error) {
        console.log('error from add cate : ', error)
        return { status: 400, message: error.message }
    }
}

export async function EditCategory(type, data, id) {
    try {
        const docRef = doc(db, "userConfig", id)
        await updateDoc(docRef, {
            [type]: data
        });
        return { status: 200, message: 'update success' }
    } catch (error) {
        console.log('error from add cate : ', error)
        return { status: 400, message: error.message }
    }
}

export async function ChangeSpendingLimit(id, data) {
    try {
        const docRef = doc(db, "userConfig", id)
        await updateDoc(docRef, {
            spendingLimit: parseInt(data)
        });
        return { status: 200, message: 'update spending limit success' }
    } catch (error) {
        console.log('error from add cate : ', error)
        return { status: 400, message: error.message }
    }
}