"use server"

import { doc, collection, getDoc, getDocs, addDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

export async function getAllData(uid, month) {
    try {
        const docRef = collection(db, "financeTrack", uid, month)
        const docSnap = await getDocs(docRef);
        const result = docSnap.docs.map((doc) => {
            const convertData = {
                id: doc.id,
                data: doc.data()
            }
            return convertData
        })
        const convertResult = JSON.stringify(result)
        return convertResult
    } catch (error) {
        console.log('error from get doc : ', error)
        return { status: 400, message: "can't fetch data" }
    }
}


export async function deleteDocFormId(uid, docId, month) {
    try {
        await deleteDoc(doc(db, "financeTrack", uid, month, docId));
        return { status: 200, msg: 'delete transection success' }
    } catch (error) {
        console.log(error)
        return { status: 400, msg: 'delete transection success' }
    }
}

export async function createTransection(data) {
    try {
        const userId = data.userid
        const date = new Date(data.createdDate)
        const getMonthFormat = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

        const convertData = {
            type: data.type,
            category: data.category,
            amout: data.amout,
            createdDate: date
        }

        const docRef = collection(db, "financeTrack", userId, getMonthFormat)
        await addDoc(docRef, convertData)

        return { status: 201, msg: 'create new transection success !!' }

    } catch (error) {
        console.log('add error : ', error)
        return error
    }
}


export async function updateData(data) {
    try {
        const userId = data.userid
        const docId = data.docid
        const date = new Date(data.createdDate)
        const getMonth = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

        const convertData = {
            type: data.type,
            category: data.category,
            amout: data.amout,
            createdDate: date
        }
        console.log('check convert data before update : ', convertData)
        console.log('check getMonth : ', getMonth)
        const docRef = doc(db, "financeTrack", userId, getMonth, docId)
        await setDoc(docRef, convertData);

        return { status: 200, message: 'Update transection successful' }

    } catch (error) {
        console.log('add error : ', error)
        return { status: 400, message: "can't update transection" }
    }
}

export async function loadUserConfig(userId) {
    try {
        const docRef = doc(db, "userConfig", userId);
        const querySnapshot = await getDoc(docRef);
        const result = querySnapshot.data()
        // console.log(querySnapshot.data())
        return result
    } catch (error) {
        console.log('error')
    }
}