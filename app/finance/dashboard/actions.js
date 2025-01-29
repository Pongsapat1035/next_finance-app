"use server"

import { doc, collection, getDoc, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/firebase";


export async function getAllData(uid, month) {
    try {
        console.log('check uid ', uid)

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
        console.log(result)
        return convertResult
    } catch (error) {
        console.log('error from get doc : ', error)
        // return error
    }
}

export async function getData(params) {
    try {
        console.log('check uid ', uid)
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
        console.log(result)
        return convertResult
    } catch (error) {
        console.log('error from get doc : ', error)
        // return error
    }
}

async function checkUserDoc(uid) {
    try {
        const docRef = doc(db, "financeTrack", `${uid}`)
        const docSnap = await getDoc(docRef);
        const result = docSnap.data()
        console.log('check result : ', result)
        return result ? true : false

    } catch (error) {
        console.log(error)
    }
}



export async function deleteDocFormId(uid, docId, month) {
    try {
        console.log('recieve data', uid)
        console.log('recieve data', docId)
        const response = await deleteDoc(doc(db, "financeTrack", uid, month, docId));
        // console.log(response)
        return 'success'
    } catch (error) {
        console.log(error)
    }
}

export async function addData(data, month) {
    try {
        const userId = data.userid
        const convertData = {
            type: data.type,
            category: data.category,
            amout: data.amout,
            createdDate: new Date()
        }
        const checkUser = await checkUserDoc(userId)

        if (checkUser) {
            // has user doc
            const docRef = collection(db, "financeTrack", userId, month)
            const response = await addDoc(docRef, convertData)
            console.log('add from exit success')


        } else {
            // new user
            console.log('new user')
            const docRef = collection(db, "financeTrack", userId, month)
            const response = await addDoc(docRef, convertData)
            // console.log('add from create new month')
        }
        return 'data added'

    } catch (error) {
        console.log('add error : ', error)
        return error
    }
}