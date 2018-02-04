export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
export const GET_CATEGORY = 'GET_CATEGORY'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY'

export const LOAD_POSTS = 'LOAD_POSTS'
export const GET_POST = 'GET_POST'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const UPDATE_POST = 'UPDATE_POST'

export const GET_COMMENT = 'GET_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const LOAD_POST_COMMENTS = 'LOAD_POST_COMMENTS'

export function loadCategories(categories) {
    return {
        type: LOAD_CATEGORIES,
        categories
    }

}

export function loadPosts(posts) {
    return {
        type: LOAD_POSTS,
        posts
    }
}

export function updatePost(post) {
    return {
        type: UPDATE_POST,
        post
    }
}


export function addPost(post) {
    return {
        type: ADD_POST,
        post
    }
}

export function updateComment(comment) {
    return {
        type: UPDATE_COMMENT,
        comment
    }
}


export function addComment(comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export function loadPostComments(postId, comments) {
    return {
        type: LOAD_POST_COMMENTS,
        postId,
        comments
    }
}