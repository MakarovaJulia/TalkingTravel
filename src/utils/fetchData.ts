import {app, database} from '../firebase'

import {collection, doc, getDocs, getDoc, orderBy, query, where, limit, deleteDoc} from "firebase/firestore";

export const getAllFeeds = async (database:any) => {
    const feeds = await getDocs(
        query(collection(database, "posts"), orderBy("id", "desc"))
    )
    return feeds.docs.map(doc => doc.data())
}

export const categoryFeeds = async (database:any, categoryId:any) =>{
    const feeds = await getDocs(
        query(
            collection(database, "posts"),
            where("category", "==", categoryId),
            orderBy("id", "desc")
        )
    )
    return feeds.docs.map(doc => doc.data())
}

export const getUserInfo = async(database:any, userId:any) => {
    const userRef = doc(database, 'profile', userId)
    const userSnap = await getDoc(userRef)
    if (userSnap.exists()){
        return userSnap.data()
    } else {
        return 'No such doc'
    }
}

export const userUploadedPins = async (database:any, userId:any) => {
    const feeds = await getDocs(
            query(collection(database, "posts"),
            where('userId', '==', userId),
            orderBy("id", "desc"))
    )
    return feeds.docs.map(doc => doc.data())
}

export const getSpecificPin = async(database:any, pinId:any) =>{
    const pinRef = doc(database, 'posts', pinId)
    const pinSnap = await getDoc(pinRef)
    return pinSnap
}


export const getTopFourPins = async (database:any) => {
    const feeds = await getDocs(
        query(collection(database, "posts"),
            orderBy("likes"), limit(4))
    )
    return feeds.docs.map(doc => doc.data())
}

export const deletePinById = async (database:any, pinId:any) =>{
    await deleteDoc(doc(database, "posts", pinId))
}
