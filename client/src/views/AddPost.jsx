import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import fetch from "../api/api";
import { addPost } from '../redux/actions/actions';
import Navbar from "./Navbar";

const AddPost = () => {
    const [postInfo, setPostInfo] = useState({author: "", title: "", content: ""});
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddPost = async (e) => {
        e.preventDefault();
        const { author, title, content } = postInfo;
        if((!author || !author.length > 0) || (!content || !content.length > 0) || 
            (!title || !title.length > 0)){
            return setError("All fields are required!!");
        }
        setLoading(true);
        try {
            const {data} = await fetch.post("/posts", postInfo);
            setSuccess(data.message);
            return setTimeout(() => {
                setSuccess("");
                setLoading(false);
                dispatch(addPost(data.post));
                return navigate("/posts");
            }, 2000);
        } catch (error) {
            setError(error.response ? error.response.data.error : error.message);
            return setLoading(false);
        }
    }

    return (
        <React.Fragment>
            <Navbar />

            <div className="container">
                <div className="row my-4">
                    <div className="col-sm-12 col-md-8 col-lg-6 m-auto">

                        {success ? <div className="alert alert-success my-4">{success}</div> : null}
                        {error ? <div className="alert alert-danger my-4">{error}</div> : null}

                        <div className="card">
                            <h4 className="card-title py-4 bg-danger text-center text-white">New Post</h4>
                            <div className="card-body">
                                <form onSubmit={handleAddPost} autoComplete="off">
                                    <div className="form-group">
                                        <input type="text" className="form-control" 
                                            value={postInfo.author} name="author" placeholder="Author" 
                                            onChange={(e) => {
                                                if(error){setError("")}
                                                return setPostInfo({...postInfo, author: e.target.value});
                                            }}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input type="text" className="form-control" 
                                            value={postInfo.title} name="title" placeholder="Title" 
                                            onChange={(e) => {
                                                if(error){setError("")}
                                                return setPostInfo({...postInfo, title: e.target.value});
                                            }}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <textarea className="form-control" name="content"
                                            value={postInfo.content}  placeholder="Content"
                                            onChange={(e) => {
                                                if(error){setError("")}
                                                return setPostInfo({...postInfo, content: e.target.value});
                                            }}
                                        ></textarea>
                                    </div>

                                    {
                                        !loading ? (
                                            <input type="submit" value="Add" className="btn btn-outline-danger btn-block" />
                                        ) : (
                                            <div className="flex_center_center">
                                                <div className="spinner-border text-danger mx-auto" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </div>
                                        )
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AddPost;