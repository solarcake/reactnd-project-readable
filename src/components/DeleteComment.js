import React from 'react';
import * as BlogAPI from '../BlogAPI'
import {updateComment} from '../actions/CommentActions'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import Deletedit from 'material-ui/svg-icons/action/delete';

const DeleteComment = (props) => {
    const comment =  props.comment;
    const buttonControl = props.control === 'button'

    function removeComment(comment) {
        const updateComment= props.updateComment;
        const onSubmit = props.onSubmit;
        BlogAPI.removeComment(comment)
        .then((response) => {
            updateComment(response);
        }).then(()=> {
            if (onSubmit) {
                onSubmit('Comment Deleted');
            }
        });
    }

    return (
        buttonControl ? 
        <FlatButton primary={true} onClick={()=> removeComment(comment)}>Delete Comment</FlatButton>
        :
        <span style={{ cursor: 'pointer' }} onClick={()=> removeComment(comment)}>{<Deletedit/>}</span>
    )
}

function mapDispatchToProps (dispatch) {
    return {
        updateComment: (data) => dispatch(updateComment(data))
    }
}
      
export default connect(
    null,
    mapDispatchToProps
)(DeleteComment)


