import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PostForm from '../form/PostForm';
import {updatePost, addPost} from '../actions'
import {generateID} from '../utils/appUtils'
import CommentList from './CommentList'
import * as BlogAPI from '../BlogAPI'

class Post extends Component {
    state = {
        message: null,
        currentPost: null
    }

    processPostUpdate(values, dispatch, props) {
        const {updatePost} = this.props;
        this.setState({message: 'Updating Post'})
        updatePost(values);
    }

    addNewPost(values, dispatch, props) {
        const {addPost} = this.props;
        // enhance post with ID and time stamp and default values
        values.id = generateID()
        values.timestamp = Date.now()
        values.voteScore = 1
        values.deleted = false
        values.commentCount = 0
        this.setState({message: 'Adding New Post', currentPost:values.id});
        BlogAPI.addPost(values).then((response) => {
            addPost(values);
        });
    }

    render() {
        // supplied by parameter or from state
        const postId = this.props.match.params.postId || this.state.currentPost;
        const categoryId = this.props.match.params.categoryId;
        const posts = this.props.post || [];
        let editedPost = posts.filter((post) => post.id === postId).pop();
        return (
            <div>
                {this.state.message ? 
                <div>
                    <h1>{this.state.message}</h1>
                </div>:''}
                {editedPost 
                    ?
                     <div>
                         <span>Post: editing post {postId} </span> 
                         <PostForm initialValues={editedPost} onSubmit={this.processPostUpdate.bind(this)}/>
                         <CommentList postId={postId}/>                         
                    </div>
                    : 
                    <div>
                        <span>New Post</span>
                        <PostForm onSubmit={this.addNewPost.bind(this)}/>
                    </div>
                }
                <Link href="#" to="/">Back to Main</Link>
            </div>
        )
    }
}

function mapStateToProps ({post}) {
    return {
      post
    }
  }
  
function mapDispatchToProps (dispatch) {
    return {
        updatePost: (data) => dispatch(updatePost(data)),
        addPost: (data) => dispatch(addPost(data))
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post)