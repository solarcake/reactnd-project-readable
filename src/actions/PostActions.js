import * as ActionTypes from './types';

export function loadPosts(posts) {
    return {
        type: ActionTypes.LOAD_POSTS,
        posts
    }
}

export function updatePost(post) {
    return {
        type: ActionTypes.UPDATE_POST,
        post
    }
}

export function addPost(post) {
    return {
        type: ActionTypes.ADD_POST,
        post
    }
}
