"use server"

import { doc, collection, getDoc, getDocs, addDoc, deleteDoc, updateDoc, setDoc } from "firebase/firestore";
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
        // return error
    }
}


export async function deleteDocFormId(uid, docId, month) {
    try {

        console.log(`delete data ${uid} / ${docId} / ${month}`)
        const response = await deleteDoc(doc(db, "financeTrack", uid, month, docId));
        // console.log(response)
        return 'success'
    } catch (error) {
        console.log(error)
    }
}

export async function addData(data) {
    try {
        const userId = data.userid
        console.log('check recieve date : ', data.createdDate)
        console.log('check recieve date : ', typeof (data.createdDate))
        const date = new Date(data.createdDate)
        const getMonth = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

        const convertData = {
            type: data.type,
            category: data.category,
            amout: data.amout,
            createdDate: date
        }
        const docRef = collection(db, "financeTrack", userId, getMonth)
        const response = await addDoc(docRef, convertData)
        console.log('add from exit success')

        return 'data added'

    } catch (error) {
        console.log('add error : ', error)
        return error
    }
}


export async function updateData(data) {
    try {
        console.log('check recieve data : ', data)
        console.log('check recieve data : ', data.createdDate)
        console.log('check type : ', typeof (data.createdDate))
        const userId = data.userid
        const docId = data.docid
        const date = new Date(data.createdDate)
        const getMonth = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        console.log('check month : ', getMonth)
        const convertData = {
            type: data.type,
            category: data.category,
            amout: data.amout,
            createdDate: data.createdDate
        }
        console.log('check send data : ', convertData)
        const docRef = doc(db, "financeTrack", userId, getMonth, docId)
        const response = await setDoc(docRef, convertData);
        console.log('check response : ', response)
        return 'data updated'

    } catch (error) {
        console.log('add error : ', error)
        return error
    }
}

export async function loadUserConfig(userId) {
    try {
        const docRef = doc(db, "userConfig", userId);
        const querySnapshot = await getDoc(docRef);
        const result = querySnapshot.data()
        console.log(querySnapshot.data())
        return result
    } catch (error) {
        console.log('error')
    }
}