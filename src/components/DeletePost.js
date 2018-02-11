import React, {Component} from 'react';
import * as BlogAPI from '../BlogAPI'
import {updatePost} from '../actions'
import { connect } from 'react-redux'

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
        return (
            <button type="button" onClick={()=> this.removePost(post)} className="btn btn-danger">Delete Post</button>
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
        updatePost: (data) => dispatch(updatePost(data))
    }
}
    
function mapStateToProps() {
    return {};
}
      
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeletePost)


