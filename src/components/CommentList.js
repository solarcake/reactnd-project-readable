import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BlogAPI from '../BlogAPI'
import { connect } from 'react-redux'
import {loadPostComments} from '../actions'
import DeleteComment from './DeleteComment'
import VoteComment from './VoteComment'

class CommentList extends Component {
    componentDidMount() {
        const postId = this.props.postId;
        if (postId) {
            BlogAPI.getComments(postId).then((comments) => {
                if (comments.length > 0) {
                    this.props.loadPostComments(postId, comments);
                }
            });
        }
    }

    render() {
        const postId = this.props.postId;
        const postComments = this.props.comment[postId] ? this.props.comment[postId].comments : [];
        const comments =  postComments.filter((c) => !c.deleted);
       
        return (
            <div style={{padding:20}}>
                <div className="row">
                    <div className="panel panel-default">
                    <div className="panel-heading">You have {comments.length} comments on this post</div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Comment</th>
                                    <th>Vote</th>
                                    <th>&nbsp;</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comments.map((comment) => (
                                    <tr key={comment.id}>
                                        <td>{comment.author}</td>
                                        <td><VoteComment comment={comment}/></td>
                                        <td><Link to={`/comment/${postId}/${comment.id}`}>Edit</Link></td>
                                        <td><DeleteComment comment={comment}/></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    </div>
                <Link to={`/comment/${postId}`}>New Comment</Link>
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