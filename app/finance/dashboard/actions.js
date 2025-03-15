"use server"

import { doc, collection, getDocs, addDoc, deleteDoc, setDoc, runTransaction } from "firebase/firestore";
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

export async function getTotalReport(uid) {
    try {
        const docRef = collection(db, "financeTrack", uid, "total")
        const docSnap = await getDocs(docRef);
        const result = docSnap.docs.map((doc) => doc.data())

        return result
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
        const getMonth = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

        const convertData = {
            type: data.type,
            description: data.description,
            category: data.category,
            amout: parseInt(data.amout),
            createdDate: date
        }

        await runTransaction(db, async (transaction) => {
            // financeTrack/uid/total/month
            const totalDocRef = doc(db, "financeTrack", userId, "total", getMonth)
            const totalDoc = await transaction.get(totalDocRef);
            if (!totalDoc.exists()) {
                // create new total
                const amout = convertData.amout
                transaction.set(totalDocRef, ({ [convertData.type]: amout, year: date.getFullYear(), monthIndex: date.getMonth() }))
            } else {
                // update exit total
                const newTotal = (totalDoc.data()[convertData.type] || 0) + convertData.amout
                transaction.update(totalDocRef, { [convertData.type]: newTotal });
            }
        });

        const docRef = collection(db, "financeTrack", userId, getMonth)
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
        const getPrevMonth = new Date(data.prevDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        console.log()
        const convertData = {
            type: data.type,
            category: data.category,
            amout: parseInt(data.amout),
            createdDate: date,
            description: data.description
        }

        await runTransaction(db, async (transaction) => {
            const prevDocRef = doc(db, "financeTrack", userId, getPrevMonth, docId)
            const prevDoc = await transaction.get(prevDocRef);
            console.log('recieved Doc : ', prevDoc.data())
            // financeTrack/uid/total/month
            const totalDocRef = doc(db, "financeTrack", userId, "total", getMonth)
            const totalDoc = await transaction.get(totalDocRef);
            if (!totalDoc.exists()) {
                // create new total
                const amout = convertData.amout
                transaction.set(totalDocRef, ({ [convertData.type]: amout, year: date.getFullYear(), monthIndex: date.getMonth() }))
            } else {
                // update exit total
                const newTotal = (totalDoc.data()[convertData.type] || 0) + convertData.amout
                transaction.update(totalDocRef, { [convertData.type]: newTotal });
            }
        });

        const docRef = doc(db, "financeTrack", userId, getMonth, docId)
        await setDoc(docRef, convertData);

        return { status: 200, message: 'Update transection successful' }

    } catch (error) {
        console.log('add error : ', error)
        return { status: 400, message: "can't update transection" }
    }
}

