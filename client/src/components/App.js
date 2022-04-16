import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Navigate } from 'react-router';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "../index.css";
import Home from "../views/Home";
import Posts from "../views/Posts";
import Post from "../views/Post";
import AddPost from "../views/AddPost";
import EditPost from "../views/EditPost";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/posts/add" element={<AddPost />} />
                <Route path="/posts/:id/edit" element={<EditPost />} />
                <Route path="/posts/:id" element={<Post />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}
 
export default App;