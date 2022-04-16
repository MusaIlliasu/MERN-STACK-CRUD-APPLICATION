import { ADD_POST, UPDATE_POSTS, UPDATE_POST, REMOVE_POST } from "../actions/actionTypes";

const postReducer = (state = [], action) => {
    switch(action.type) {
        case ADD_POST:
            return [...state, action.payload.post];
        case UPDATE_POSTS:
            return action.payload.posts;
        case UPDATE_POST:
            const updatedPosts = state.map(post => {
                if(post._id === action.payload.post._id){
                    return action.payload.post;
                }
                return post;
            });
            return updatedPosts;
        case REMOVE_POST:
            return state.filter(post => post._id !== action.payload.id);
        default:
            return state;
    }
}

export default postReducer;