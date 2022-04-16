import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { updatePost } from '../redux/actions/actions';
import { useParams } from "react-router";
import fetch from "../api/api";
import Navbar from "./Navbar";

const EditPost = () => {
    const posts = useSelector(state => state.posts);
    const [post, setPost] = useState({_id: "", author: "", title: "", content: ""});
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {

        const currentPost = posts.find(post => post._id === id);
        if(!currentPost){return navigate("/posts")}
        return setPost(currentPost);

    }, [posts]);

    const handleUpdatePost = async (e) => {
        e.preventDefault();
        const { author, title, content } = post;
        if((!author || !author.length > 0) || (!content || !content.length > 0) || 
            (!title || !title.length > 0)){
            return setError("All fields are required!!");
        }
        setLoading(true);
        try {
            const {data} = await fetch.put(`/posts/${id}`, post);
            setSuccess(data.message);
            return setTimeout(() => {
                setSuccess("");
                setLoading(false);
                dispatch(updatePost(post));
                return navigate(`/posts/${post._id}`);
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

                        {success ? <div className="alert alert-success">{success}</div> : null }
                        {error ? <div className="alert alert-danger">{error}</div> : null }

                        <div className="card">
                            <h4 className="card-title py-4 bg-danger text-center text-white">Edit Post</h4>
                            <div className="card-body">
                                <form onSubmit={handleUpdatePost} autoComplete="off">
                                    <div className="form-group">
                                        <input type="text" className="form-control" 
                                            value={post.author} name="author" placeholder="Author" 
                                            onChange={(e) => {
                                                if(error){setError("")}
                                                return setPost({...post, author: e.target.value});
                                            }}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input type="text" className="form-control" 
                                            value={post.title} name="title" placeholder="Title" 
                                            onChange={(e) => {
                                                if(error){setError("")}
                                                return setPost({...post, title: e.target.value});
                                            }}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <textarea className="form-control" name="content"
                                            value={post.content}  placeholder="Content"
                                            onChange={(e) => {
                                                if(error){setError("")}
                                                return setPost({...post, content: e.target.value});
                                            }}
                                        ></textarea>
                                    </div>

                                    {
                                        !loading ? (
                                            <input type="submit" value="Update" className="btn btn-outline-danger btn-block" />
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
 
export default EditPost;