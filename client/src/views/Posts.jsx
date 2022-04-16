import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPosts } from '../redux/actions/actions';
import Navbar from './Navbar';

const Posts = () => {
    const posts = useSelector(state => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {

        return dispatch(getPosts());

    }, [posts]);
    
    return (
        <React.Fragment>
            <Navbar />

            <div className="jumbotron jumbotron-fluid py-3">
                <div className="container">
                    <h2 className="text-center text-muted">🚀 THE MERN STACK 🚀</h2>
                </div>
            </div>
            <div className="container">
                {
                    posts.length > 0 ? (
                        <div className="row my-2">
                            {
                                posts.map(post => (
                                    <div key={post._id} className="col-sm-12 col-md-6 col-lg-4 mb-2">
                                        <div className="card">
                                            <div className="card-body">
                                                <h4 className="card-title bd_btm">{post.title}</h4>
                                                <p>{post.content.length > 30 ? (`${post.content.substr(0, 30)}...`) : (post.content)}</p>
                                                
                                                <div className="flex_between_center">
                                                    <Link to={`/posts/${post._id}`} className="btn btn-danger btn-sm mr-2 mb-2">Read More</Link>
                                                    <span style={{fontSize: "10px"}}>{post.createdAt}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <h4 className="text-center">No posts</h4>
                    )
                }
            </div>
        </React.Fragment>
    );
}

export default Posts;