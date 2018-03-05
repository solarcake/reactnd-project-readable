import React, {Component} from 'react'
import CommentForm from '../form/CommentForm'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {updateComment, addComment} from '../actions/CommentActions'
import {updatePost} from '../actions/PostActions'
import {generateID} from '../utils/appUtils'
import * as BlogAPI from '../BlogAPI'
import DeleteComment from './DeleteComment'

class Comment extends Component {
    state = {
        message: '',
        type: '',
        comment: null
    }
    
    constructor(props) {
        super(props);
        this.updateComment = this.updateComment.bind(this);
        this.processDeleteComment = this.postDeleteComment.bind(this);
    }

    componentDidMount() {
        const commentId = this.props.match.params.commentId;
        if (commentId) {
            BlogAPI.getComment(commentId).then((comment) => {
                if (!comment.id || comment.error) {
                    this.props.history.push('/404');
                    return;
                }
                
                updateComment(comment);
                this.setState({
                    comment: comment
                });
            });
        }
    }

    updateComment(values, dispatch, props) {
        const {updateComment} = this.props;
        BlogAPI.updateComment(values).then(() => {
            updateComment(values);
            this.setState({
                message: 'Comment updated',
                type: 'success',
                comment: values
            });
        });  
    }

    addNewComment(values, dispatch, props) {
        const {addComment, updatePost, post} = this.props;
        const postId = this.props.match.params.postId;
        if (!values.body || !values.author) {
            this.setState({
                message: 'All fields must be filled in',
                type: 'failure'
            });

            return;
        }

        let commentpost = post.filter((p) => p.id === postId)[0];

        // enhance post with ID and time stamp and default values
        values.id = generateID()
        values.timestamp = Date.now()
        values.voteScore = 1
        values.deleted = false
        values.parentDelete = false
        values.parentId = postId
        commentpost.commentCount+= 1;
        BlogAPI.addComment(values).then((response) => {
            addComment(values);
            updatePost(commentpost);
        }).then((comment)=> {
            this.setState({
                message: 'Added new comment',
                type: 'success',
                comment: values
            });
            this.props.history.push(`/comment/${values.parentId}/${values.id}/`);
        }); 
    }

    postDeleteComment() {
        const postId = this.props.match.params.postId
        this.props.history.push(`/post/${postId}/`);
    }

    render() {
        const postId = this.props.match.params.postId;
        const comment = this.state.comment;
        return (
            <div>
                {this.state.message ? 
                    <div className={this.state.type === 'success'? 'alert alert-success' : 'alert alert-danger'}>
                    <strong>{this.state.message}</strong>
                </div>:''}
                {comment
                    ?
                    <div>
                        <h2>Edit comment</h2> 
                        <CommentForm initialValues={comment} onSubmit={this.updateComment}/> 
                        <DeleteComment comment={comment} onSubmit={this.processDeleteComment} control="button"/>                         
                    </div>
                    : 
                    <div>
                        <h2>New Comment</h2>
                        <CommentForm onSubmit={this.addNewComment.bind(this)}/>
                    </div>
                }
             <Link href="#" to={`/post/${postId}`}>Back to Post</Link>
            </div>
        )
    }
}

  function mapStateToProps ({post}) {
    return {
        post: post
    };
  }
  
  function mapDispatchToProps (dispatch) {
    return {
        updateComment: (data) => dispatch(updateComment(data)),
        addComment: (data) => dispatch(addComment(data)),
        updatePost: (data) => dispatch(updatePost(data))
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comment)