import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import {
    LOAD_CATEGORIES,
    LOAD_POSTS,
    LOAD_POST_COMMENTS,
    UPDATE_POST,
    ADD_POST,
    UPDATE_COMMENT,
    ADD_COMMENT
} from '../actions'

function category(state = [], action) {
    const {categories, type } = action;
    switch (type) {
        case LOAD_CATEGORIES:
            return categories;
        default:
            return state;
    }
}

function post(state = [], action) {
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

function comment(state = {}, action) {
    const {comments, type, postId, comment} = action;
    switch (type) {
        case LOAD_POST_COMMENTS:
            return {
                ...state,
                [postId]: {
                    comments: comments
                }
            }
        case ADD_COMMENT:
            let stateComments = state[comment.parentId] ? state[comment.parentId].comments : [];
            return {
                ...state,
                [comment.parentId]: {
                    comments: stateComments.concat([comment])
                }
            }
        case UPDATE_COMMENT:
            return {
                ...state,
                [comment.parentId]: {
                    comments: state[comment.parentId].comments.filter((c)=> c.id !== comment.id).concat([comment])
                }
            }
        default: 
            return state;
    }
}

export default combineReducers({category, post, comment, form: formReducer })