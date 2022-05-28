import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,
    signOut, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import {getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable} from "firebase/storage"
import {useEffect, useState} from "react";
import {addDoc, collection, doc, getFirestore, setDoc} from 'firebase/firestore';
import firebase from "firebase/compat/app";
import "firebase/firestore"
import "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyA1DSJD4H2BDC0quOaoWlDnHYDtJ_5REks",
    authDomain: "talking-travel-722ce.firebaseapp.com",
    projectId: "talking-travel-722ce",
    storageBucket: "talking-travel-722ce.appspot.com",
    messagingSenderId: "270361645595",
    appId: "1:270361645595:web:ad9d2e785f99f8a5449ebe"
}

export const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export const storage = getStorage(app)
const provider = new GoogleAuthProvider()
export const database = getFirestore();
const usersDatabaseRef = collection(database, 'profile');



export const signInWithGoogle = () =>{
    signInWithPopup(auth, provider).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
}

export function signup(email:any,  password:any, userData?:any){
    return createUserWithEmailAndPassword(auth, email, password)
        .then((registeredUser) => {
            setDoc(doc(database, 'profile', registeredUser.user.uid), {
                uid: registeredUser.user.uid,
                name: userData.name,
                email: userData.email
            })
                .then(res => console.log(res));
        })
}

export function login(email:any, password:any){
    return signInWithEmailAndPassword(auth, email, password);
}

export function logout(){
    return signOut(auth)
}

export function useAuth(){
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
        return unsub
    },[])

    return currentUser;
}

export async function uploadUserPhoto(file:any, currentUser:any, setLoading:any){
    const fileRef = ref(storage, currentUser.uid + '.png')
    setLoading(true)
    const snapshot = await uploadBytes(fileRef, file)
    const photoURL = await getDownloadURL(fileRef)

    await updateProfile(currentUser, {photoURL})

    setLoading(false)
    alert("Uploaded file")
}