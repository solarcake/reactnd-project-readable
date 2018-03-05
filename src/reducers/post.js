import {
    LOAD_POSTS,
    UPDATE_POST,
    ADD_POST,
} from '../actions/types'

export default function post(state = [], action) {
    const {posts, type, post } = action;
    switch (type) {
        case LOAD_POSTS:
            return posts;
        case UPDATE_POST:
            return state.filter((statePost) => 
                statePost.id !== post.id
            ).concat([post]);
        case ADD_POST:
            return state.concat([post]);
        default:
            return state;
    }
}