"use server"

import { doc, collection, getDoc, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/firebase";


function getMonth() {
    const date = new Date()
    const options = {
        month: 'short',
        year: 'numeric'
    };
    return date.toLocaleDateString("en-US", options)
}

export async function getData(uid) {
    try {
        console.log('check uid ', uid)

        const docRef = collection(db, "financeTrack", uid, getMonth())
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

async function checkMonthDoc(uid, currentMonth) {
    try {
        const docRef = collection(db, "financeTrack", uid, currentMonth)
        const docSnap = await getDocs(docRef);
        const result = docSnap.docs.map((doc) => doc.data())
        // console.log('check month', docSnap.docs)

        return result.length > 0 ? true : false

    } catch (error) {
        console.log('error from get doc : ', error)
        // return error
    }
}

export async function deleteDocFormId(uid, docId) {
    try {
        console.log('recieve data', uid)
        console.log('recieve data', docId)
        const response = await deleteDoc(doc(db, "financeTrack", uid,getMonth(), docId));
        // console.log(response)
        return 'success'
    } catch (error) {
        console.log(error)
    }
}

export async function addData(data) {
    try {
        const userId = data.userid
        const currentMonth = getMonth()
        const convertData = {
            type: data.type,
            category: data.category,
            amout: data.amout,
            createdDate: new Date()
        }
        const checkUser = await checkUserDoc(userId)

        if (checkUser) {
            // has user doc
            const docRef = collection(db, "financeTrack", userId, currentMonth)
            const response = await addDoc(docRef, convertData)
            console.log('add from exit success')


        } else {
            // new user
            console.log('new user')
            const docRef = collection(db, "financeTrack", userId, currentMonth)
            const response = await addDoc(docRef, convertData)
            // console.log('add from create new month')
        }
        return 'data added'
        console.log('check user', checkUser)
    } catch (error) {
        console.log('add error : ', error)
        return error
    }
}