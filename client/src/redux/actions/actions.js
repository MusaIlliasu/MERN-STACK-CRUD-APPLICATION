import fetch from "../../api/api";
import { ADD_POST, UPDATE_POSTS, UPDATE_POST, REMOVE_POST } from "./actionTypes";

export const getPosts = () => async dispatch => {
    const {data} = await fetch.get("/posts");
    dispatch({ type: UPDATE_POSTS, payload: {posts: data.posts}});
}
export const getPost = id => async dispatch => {
    const {data} = await fetch.get(`/posts/${id}`);
    dispatch({ type: UPDATE_POST, payload: {post: data.post}});
}
export const addPost = post => async dispatch => {
    return dispatch({ type: ADD_POST, payload: { post }});
}
export const updatePost = post => async dispatch => {
    return dispatch({ type: UPDATE_POST, payload: { post }});
}
export const removePost = id => async dispatch => {
    return dispatch({ type: REMOVE_POST, payload: { id }});
}
