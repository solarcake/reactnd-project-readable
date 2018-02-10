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
        BlogAPI.updatePost(values).then((response) => {
            this.setState({message: 'Updating Post'})
            updatePost(values);
        });
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
        }).then(()=> {
            this.setState({message: 'Post added successfully', currentPost:values.id});
        });
    }

    render() {
        // supplied by parameter or from state
        const postId = this.props.match.params.postId || this.state.currentPost;
        const posts = this.props.post || [];
        let editedPost = posts.filter((post) => post.id === postId).pop();
        return (
            <div>
                {this.state.message ? 
                    <div class="alert alert-success">
                        <strong>{this.state.message}</strong>
                    </div>
                :''}
                {editedPost 
                    ?
                     <div>
                         <h2>Editing Post</h2> 
                         <PostForm initialValues={editedPost} onSubmit={this.processPostUpdate.bind(this)}/>
                         <CommentList postId={postId}/>                         
                    </div>
                    : 
                    <div>
                        <h2>New Post</h2>
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