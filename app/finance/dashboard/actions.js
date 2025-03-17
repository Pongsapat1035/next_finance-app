"use server"

import { doc, collection, getDocs, getDoc, addDoc, setDoc, runTransaction, query, where } from "firebase/firestore";
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

export async function getTotalReport(uid, year) {
    try {
        console.log('recieved data : ', uid + '/' + year)
        const colRef = collection(db, "financeTrack", uid, "total")
        const docRef = query(colRef, where("year", "==", year))
        const docSnap = await getDocs(docRef);
        const result = docSnap.docs.map((doc) => doc.data())
        console.log(result)
        return result
    } catch (error) {
        console.log('error from get doc : ', error)
        return { status: 400, message: "can't fetch data" }
    }
}

export async function deleteDocFormId(uid, docId, data) {
    try {
        const { month, type, amout } = data
        await runTransaction(db, async (transaction) => {
            const totalDocRef = doc(db, "financeTrack", uid, "total", month)
            const totalDoc = await transaction.get(totalDocRef);

            // remove value from old total
            const newTotal = totalDoc.data()[type] - amout
            transaction.update(totalDocRef, { [type]: newTotal });

            transaction.delete(doc(db, "financeTrack", uid, month, docId))
        })
        return { status: 200, msg: 'delete transection success' }
    } catch (error) {
        console.log(error)
        return { status: 400, msg: 'delete transection success' }
    }
}

export async function createTransection(data) {
    try {
        const uid = data.userid
        const date = new Date(data.createdDate)
        const getMonth = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

        const convertData = {
            type: data.type,
            description: data.description,
            category: data.category,
            amout: parseInt(data.amout),
            createdDate: date,
        }

        await runTransaction(db, async (transaction) => {
            // financeTrack/uid/total/month
            const totalDocRef = doc(db, "financeTrack", uid, "total", getMonth)
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

        const docRef = collection(db, "financeTrack", uid, getMonth)
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
        const newMonth = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        const prevMonth = new Date(data.prevDate * 1000).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

        const convertData = {
            type: data.type,
            category: data.category,
            amout: parseInt(data.amout),
            createdDate: date,
            description: data.description
        }

        // get old doc data
        const prevDocRef = doc(db, "financeTrack", userId, prevMonth, docId)
        const prevDoc = await getDoc(prevDocRef);
        const prevData = prevDoc.data()

        await runTransaction(db, async (transaction) => {

            // get prev total 
            const oldTotalDocRef = doc(db, "financeTrack", userId, "total", prevMonth)
            const oldTotalDoc = await transaction.get(oldTotalDocRef);

            const newtotalDocRef = doc(db, "financeTrack", userId, "total", newMonth)
            const newtotalDoc = await transaction.get(newtotalDocRef);

            // remove old amout from total
            const newTotal = (oldTotalDoc.data()[prevData.type] - prevData.amout)
            transaction.update(oldTotalDocRef, { [prevData.type]: newTotal });

            if (newMonth !== prevMonth) {
                // user change month remove old transection 
                transaction.delete(doc(db, "financeTrack", userId, prevMonth, docId));
            }

           

            if (!newtotalDoc.exists()) {
                // create new total
                const amout = convertData.amout
                transaction.set(newtotalDocRef, ({ [convertData.type]: amout, year: date.getFullYear(), monthIndex: date.getMonth() }))
            } else {
                if (prevData.type !== convertData.type) {
                    // update new total from new type
                    const newTotal = (newtotalDoc.data()[convertData.type] || 0) + convertData.amout
                    transaction.update(newtotalDocRef, { [convertData.type]: newTotal });
                } else {
                    const diff = newMonth !== prevMonth ? convertData.amout : convertData.amout - prevData.amout
                    const newTotal = (newtotalDoc.data()[convertData.type] || 0) + diff
                    transaction.update(newtotalDocRef, { [convertData.type]: newTotal });
                }
            }
        });

        const docRef = doc(db, "financeTrack", userId, newMonth, docId)
        await setDoc(docRef, convertData);

        return { status: 200, message: 'Update transection successful' }

    } catch (error) {
        console.log('add error : ', error)
        return { status: 400, message: "can't update transection" }
    }
}

