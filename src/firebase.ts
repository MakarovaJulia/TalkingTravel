import {initializeApp} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth"
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"
import {useEffect, useState} from "react";
import {collection, doc, getFirestore, setDoc} from 'firebase/firestore';
import "firebase/firestore"
import "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyCCw26NpZGEh9Cw3y1RPz0KtDrzXExet5I",
    authDomain: "travel-project-76111.firebaseapp.com",
    projectId: "travel-project-76111",
    storageBucket: "travel-project-76111.appspot.com",
    messagingSenderId: "315051916002",
    appId: "1:315051916002:web:d7902417e857e4bb527cbb"
};

export const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export const storage = getStorage(app)
const provider = new GoogleAuthProvider()
export const database = getFirestore();
const usersDatabaseRef = collection(database, 'profile');


export const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
}

export function signup(email: any, password: any, userData?: any) {
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

export function login(email: any, password: any) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
    return signOut(auth)
}

export function useAuth() {
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
        return unsub
    }, [])

    return currentUser;
}

export async function uploadUserPhoto(file: any, currentUser: any, setLoading: any) {
    const fileRef = ref(storage, currentUser.uid + '.png')
    setLoading(true)
    const snapshot = await uploadBytes(fileRef, file)
    const photoURL = await getDownloadURL(fileRef)

    await updateProfile(currentUser, {photoURL})

    setLoading(false)
    alert("Uploaded file")
}