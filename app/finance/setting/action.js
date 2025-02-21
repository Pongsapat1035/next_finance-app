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
        console.log('check recieved data : ', data + '/' + id)
        const docRef = doc(db, "userConfig", id)
        const response = await updateDoc(docRef, {
            [type]: arrayUnion(data)
        });
        return 'add success'
    } catch (error) {
        console.log('error from add cate : ', error)
        return error
    }
}

export async function DeleteCategory(type, data, id) {
    try {
        const docRef = doc(db, "userConfig", id)
        const response = await updateDoc(docRef, {
            [type]: arrayRemove(data)
        });
        return 'delete success'
    } catch (error) {
        console.log('error from add cate : ', error)
        return error
    }
}

export async function EditCategory(type, data, id) {
    try {
        const docRef = doc(db, "userConfig", id)
        const response = await updateDoc(docRef, {
            [type]: data
        });
        return 'update success'
    } catch (error) {
        console.log('error from add cate : ', error)
        return error
    }
}

export async function ChangeSpendingLimit(id, data) {
    try {
        const docRef = doc(db, "userConfig", id)
        const response = await updateDoc(docRef, {
            spendingLimit: data
        });
        return 'change spending limit success'
    } catch (error) {
        console.log('error from add cate : ', error)
        return error
    }
}