import React from 'react';
import { hot } from "react-hot-loader";
import { Routes, Route } from "react-router-dom";
import {MainPage} from "./pages/MainPage";
import {AddCardPage} from "./pages/AddCardPage";
import {GalleryPage} from "./pages/GalleryPage";
import {LoginPage} from "./pages/LogInPage";
import {SignUpPage} from "./pages/SignUpPage";
import {ProfilePage} from "./pages/ProfilePage";
import {GalleryPin} from "./components/GalleryPin";
import {CardPage} from "./pages/CardPage";
import {LikesPage} from "./pages/LikesPage";
import {ListsPage} from "./pages/ListsPage";
import {OtherUserProfilePage} from "./pages/OtherUserProfilePage";
import {Feed} from "./components/Feed";
import {ProtectedRoute} from "./utils/protectedRoute";
import {useAuth} from "./firebase";
import {ProfileLayout} from "./components/ProfileLayout";





const App = hot(module)(() => {

    const currentUser = useAuth()
    console.log(currentUser)

    return (
            <Routes>
                <Route path="/" element={<MainPage />}/>
                <Route element={<ProtectedRoute isAllowed={!!currentUser} />}>
                    <Route path="/add_card_page" element={<AddCardPage />}/>
                    <Route path="/gallery" element={<GalleryPage />}/>
                    <Route path="/pinDetail/:pinId" element={<CardPage />}/>
                    <Route path="/userDetail/:userId" element={<OtherUserProfilePage />}/>
                    <Route path="/category/:categoryId" element={<GalleryPage />}/>
                    <Route path="/profile" element={<ProfileLayout />}>
                        <Route index element={<ProfilePage/>}/>
                    </Route>
                    <Route path="/likes" element={<ProfileLayout/>}>
                        <Route index element={<LikesPage/>}/>
                    </Route>
                    <Route path="/lists" element={<ProfileLayout/>}>
                        <Route index element={<ListsPage/>}/>
                    </Route>
                </Route>
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/signup" element={<SignUpPage />}/>
            </Routes>
    );
})

export default App;
