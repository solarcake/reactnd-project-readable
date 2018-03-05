import React, {Component} from 'react';
import * as BlogAPI from '../BlogAPI'
import {updatePost} from '../actions/PostActions'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import Deletedit from 'material-ui/svg-icons/action/delete';

class DeletePost extends Component {
    removePost(post) {
        const updatePost = this.props.updatePost;
        const onSubmit = this.props.onSubmit;
        BlogAPI.removePost(post)
        .then((response) => {
            updatePost(response);
        }).then(() => {
            if (onSubmit) {
                onSubmit('Post Deleted');
            }
        });
    }

    render() {
        const post = this.props.post;
        const buttonControl = this.props.control === 'button'
        return (
            buttonControl ? 
            <FlatButton primary={true} onClick={()=> this.removePost(post)}>Delete Post</FlatButton>
            :
            <span style={{ cursor: 'pointer' }} onClick={()=> this.removePost(post)}><Deletedit/></span>
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
        updatePost: (data) => dispatch(updatePost(data))
    }
}
      
export default connect(
    null,
    mapDispatchToProps
)(DeletePost)


