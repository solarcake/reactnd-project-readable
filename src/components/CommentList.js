import React, {Component} from 'react'
import {Link} from 'react-router-dom'
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
            <div style={{padding:20}}>
                <div className="row">
                    <div className="panel panel-default">
                    <div className="panel-heading">You have {comments.length} comments on this post</div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Comment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comments.map((comment) => (
                                    <tr key={comment.id}>
                                        <td><Link to={`/comment/${postId}/${comment.id}`}>{comment.author}</Link></td>
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