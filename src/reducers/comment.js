import {
    LOAD_POST_COMMENTS,
    UPDATE_COMMENT,
    ADD_COMMENT
} from '../actions/types'

export default function comment(state = {}, action) {
    const {comments, type, postId, comment} = action;
    let stateComments;
    let updateStateComments;
    switch (type) {
        case LOAD_POST_COMMENTS:
            return {
                ...state,
                [postId]: {
                    comments: comments
                }
            }
        case ADD_COMMENT: {
            let stateComments = state[comment.parentId] ? state[comment.parentId].comments : [];
            return {
                ...state,
                [comment.parentId]: {
                    comments: stateComments.concat([comment])
                }
            }
        }
        case UPDATE_COMMENT: {
            let updateStateComments = state[comment.parentId] ? state[comment.parentId].comments : [];
            return {
                ...state,
                [comment.parentId]: {
                    comments: updateStateComments.filter((c)=> c.id !== comment.id).concat([comment])
                }
            }
        }
        default: 
            return state;
    }
}