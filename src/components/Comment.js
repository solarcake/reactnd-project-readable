import React, {Component} from 'react'
import CommentForm from '../form/CommentForm'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {updateComment, addComment} from '../actions'
import {generateID} from '../utils/appUtils'
import * as BlogAPI from '../BlogAPI'

class Comment extends Component {
    state = {
        message: ''
    }

    processCommentUpdate(values, dispatch, props) {
        const {updateComment} = this.props;
        this.setState({message: 'Updating Comment'})
        updateComment(values);
    }

    processNewComment(values, dispatch, props) {
        this.setState({message: 'Adding New Comment'});
        const {addComment} = this.props;
        // enhance post with ID and time stamp and default values
        values.id = generateID()
        values.timestamp = Date.now()
        values.voteScore = 1
        values.deleted = false
        values.parentDelete = false
        values.parentId = this.props.match.params.postId;
        BlogAPI.addComment(values).then((response) => {
            addComment(values);
        });
    }

    render() {
        const commentId = this.props.match.params.commentId;
        const postId = this.props.match.params.postId;
        const comment = this.props.comment;
        return (
            <div>
                <span>Comment {commentId}</span>
                
                <Link href="#" to="/">Back to Main</Link>
            {this.state.message ? 
            <div>
                <h1>{this.state.message}</h1>
            </div>:''}
                {comment 
                    ?
                    <div>
                        <span>Comment: editing comment {postId} </span> 
                        <CommentForm initialValues={comment} onSubmit={this.processCommentUpdate.bind(this)}/>                          
                    </div>
                    : 
                    <div>
                        <span>New Comment</span>
                        <CommentForm onSubmit={this.processNewComment.bind(this)}/>
                    </div>
                }
             <Link href="#" to="/">Back to Main</Link>
            </div>
        )
    }
}

function mapStateToProps ({comment}, ownProps) {
    const postId = ownProps.match.params.postId;
    const commentId = ownProps.match.params.commentId;
    if (!commentId || !postId || !comment[postId]) {
        return {}
    }
    const postComments = comment[postId].comments.filter((comment) => comment.id === commentId);
    return { comment: postComments[0]} || {}
  }
  
  function mapDispatchToProps (dispatch) {
    return {
        updateComment: (data) => dispatch(updateComment(data)),
        addComment: (data) => dispatch(addComment(data))
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comment)