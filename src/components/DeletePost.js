import React, {Component} from 'react';
import * as BlogAPI from '../BlogAPI'
import {updatePost} from '../actions'
import { connect } from 'react-redux'

class DeletePost extends Component {
    removePost(post) {
        const updatePost = this.props.updatePost;
        BlogAPI.removePost(post).then((response) => {
            updatePost(response);
        });
    }

    render() {
        const post = this.props.post;
        return (
            <span className="glyphicon glyphicon-remove" onClick={()=> this.removePost(post)}></span>
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


