import * as ActionTypes from './types';

export function updateComment(comment) {
    return {
        type: ActionTypes.UPDATE_COMMENT,
        comment
    }
}

export function addComment(comment) {
    return {
        type: ActionTypes.ADD_COMMENT,
        comment
    }
}

export function loadPostComments(postId, comments) {
    return {
        type: ActionTypes.LOAD_POST_COMMENTS,
        postId,
        comments
    }
}