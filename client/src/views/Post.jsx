import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import fetch from '../api/api';
import { removePost } from '../redux/actions/actions';
import Navbar from './Navbar';

const Post = () => {
    const posts = useSelector(state => state.posts);
    const [post, setPost] = useState({});
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {

        const currentPost = posts.find(post => post._id === id);
        if(!currentPost){return navigate("/posts")}
        return setPost(currentPost)

    }, [posts]);

    const handleDeletePost = async () => {
        try {
            setLoading(true);
            const {data} = await fetch.delete(`/posts/${id}`);
            setSuccess(data.message);
            return setTimeout(() => {
                setSuccess("");
                setLoading(false);
                dispatch(removePost(id));
                return navigate("/posts");
            }, 2000);
        } catch (error) {
            setError(error.response ? error.response.data.error : error.message);
            return setLoading(false);
        }
    }

    if(!post.title){return <div className="spinner"></div>}

    return (
        <React.Fragment>
            <Navbar />

            <div className="container">

                {success ? <div className="alert alert-success my-4" role="alert">{success}</div> : null}
                {error ? <div className="alert alert-danger my-4" role="alert">{error}</div> : null}

                <div className="row">
                    <div className="col-sm-12 col-md-10 mx-auto mt-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="flex_between_center">
                                    <h4 className="card-title">{post.title}</h4>

                                    <cite className="text-info p-2 bd_btm" style={{borderRadius: "8px"}}>
                                        {post.author}
                                    </cite>
                                </div>
                                <p>{post.content}</p>

                                <div className="flex_between_center">
                                    <div>
                                        <Link to={`/posts/${post._id}/edit`}
                                            className="btn btn-outline-info btn-sm mr-4 mb-2"
                                        >Edit</Link>
                                        {
                                            !loading ? (
                                                <button onClick={handleDeletePost} 
                                                    className="btn btn-outline-danger btn-sm mb-2"
                                                >Delete</button>
                                            ) : (
                                                <div className="spinner-border text-danger mx-auto" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            )
                                        }

                                    </div>

                                    <span style={{fontSize: "10px"}}>{post.createdAt}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Post;