import React, {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import styles from "./index.module.sass";
import {Input} from "../ui/Input";
import {database, storage, useAuth} from "../../firebase";
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import {collection, doc, serverTimestamp, setDoc} from "firebase/firestore";
import {categories} from "../../categoriesData";
import {Spinner} from "../Spinner";


export const Form = () => {
    let selectedFile: any;

    const {handleSubmit, formState: {errors}, reset} = useForm()
    const currentUser = useAuth()

    const [title, setTitle] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const [imageAsset, setImageAsset] = useState('')
    const [category, setCategory] = useState('Выберите категорию')

    const postsDatabaseRef = collection(database, 'posts');


    const uploadImage = (e: any) => {
        setLoading(true)
        const file = e.target.files[0]
        const fileRef = ref(storage, 'posts/' + currentUser.uid + `${file.name}`)
        const uploadTask = uploadBytesResumable(fileRef, file)

        uploadTask.on('state_changed', (snapshot: any) => {
            const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        }, (error: any) => {
            console.log(error)
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImageAsset(downloadURL)
                setLoading(false)
            })
        })
    }

    const deleteImage = () => {
        const deleteRef = ref(storage, imageAsset)
        deleteObject(deleteRef).then(() => {
            setImageAsset('')
        }).catch((error) => {
            console.log(error)
        })
    }


    const uploadDetails = async () => {
        try {
            setLoading(true)
            console.log(disabled)
            if (!title && !country && !address && !description && !imageAsset) {
            } else {
                const data = {
                    id: `${Date.now()}`,
                    title: title,
                    country: country,
                    address: address,
                    userId: currentUser.uid,
                    imageURL: imageAsset,
                    description: description,
                    category: category,
                    timestamp: serverTimestamp()
                }
                await setDoc(doc(database, 'posts', `${Date.now()}`), data)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = async (data: any) => {
        setAddress('')
        setCountry('')
        setImage('')
        setTitle('')
        setDescription('')
        console.log(data)
        reset()
    }


    useEffect(() => {
        if (title && country && address && description && imageAsset) {
            setDisabled(false)
            console.log(disabled)
        } else {
            setDisabled(true)
            console.log(disabled)
        }
    }, [title, country, address, description, imageAsset])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.card_form}>
            <Input placeholder={'Название'} required={true} id="title" onChange={(e: any) => setTitle(e.target.value)}/>
            <Input placeholder={'Страна'} required={true} id="country"
                   onChange={(e: any) => setCountry(e.target.value)}/>
            <Input placeholder={'Aдрес'} required={true} id="address"
                   onChange={(e: any) => setAddress(e.target.value)}/>
            <select className={styles.category} required={true} value={category}
                    onChange={(e: any) => setCategory(e.target.value)}>
                {categories && categories.map(data => (
                    <option key={data.id} value={data.name}>
                        {data.name}
                    </option>
                ))}
            </select>
            <textarea className={styles.description} required={true} id="description"
                      placeholder={'Расскажи о своем опыте'} onChange={(e: any) => setDescription(e.target.value)}/>
            <div className={styles.input_photo_wrapper}>
                <div className={styles.input_title}>Загрузить фото</div>
                <input className={styles.file_upload} type="file" id="upload" required onChange={uploadImage}/>
            </div>
            <div>
                {loading && (
                    <Spinner/>
                )}
            </div>
            {/*<button onClick={deleteImage}/>*/}
            <input className={styles.card_form_submit} type="submit" value="Добавить" disabled={disabled}
                   onClick={uploadDetails}/>
        </form>
    )
}
