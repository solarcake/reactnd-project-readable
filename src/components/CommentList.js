import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import CommentForm from '../form/CommentForm'
import * as BlogAPI from '../BlogAPI'
import { connect } from 'react-redux'
import {loadPostComments} from '../actions'

class CommentList extends Component {
    state = {
        comments: []
    }

    componentDidMount() {
        const postId = this.props.postId;
        if (postId) {
            BlogAPI.getComments(postId).then((comments) => {
                if (comments.length > 0) {
                    this.setState({comments});
                    this.props.loadPostComments(postId, comments);
                }
            });
        }
    }

    render() {
        const comments = this.state.comments || [];
        const postId = this.props.postId;
        return (
            <div>
                {comments.length ===0? 
                <span>No comments yet found for this post</span>:
                <span>You have {comments.length} comments on this post</span>}
            <div>
                {comments.map((comment) => (
                    <div>
                        <div class='comment'><Link to={`/comment/${postId}/${comment.id}`}>{comment.author}</Link></div>
                    </div>
                ))}
                <Link to={`/comment/${postId}`}>New Comment</Link>
            </div>
        </div>
        )}
}

function mapStateToProps ({comment}) {
    return {
      comment
    }
  }
  
function mapDispatchToProps (dispatch) {
    return {
        loadPostComments: (postId, comments) => dispatch(loadPostComments(postId, comments)),
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentList)