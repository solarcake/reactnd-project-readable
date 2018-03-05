import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BlogAPI from '../BlogAPI'
import { connect } from 'react-redux'
import {loadPostComments} from '../actions/CommentActions'
import DeleteComment from './DeleteComment'
import VoteComment from './VoteComment'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';


class CommentList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showCheckboxes: false
        }
    }

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

    renderCommentList(comments) {
        return comments.map((comment) => (
            <TableRow key={comment.id}>
                <TableRowColumn><Link to={`/comment/${comment.parentId}/${comment.id}`}>{comment.id}</Link></TableRowColumn>
                <TableRowColumn>{comment.author}</TableRowColumn>
                <TableRowColumn>{comment.voteScore}</TableRowColumn>
                <TableRowColumn><DeleteComment comment={comment}/></TableRowColumn>
                <TableRowColumn><VoteComment comment={comment} control="menuItem"/></TableRowColumn>
            </TableRow>
        ))
    }

    render() {
        const postId = this.props.postId;
        const postComments = this.props.comment[postId] ? this.props.comment[postId].comments : [];
        const comments =  postComments.filter((c) => !c.deleted);
       
        return (
            <div>
                <Table>
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                    >
                    <TableRow>
                        <TableHeaderColumn colSpan="5" tooltip="Comment posts" style={{textAlign: 'left'}}>
                            <h2>Blog Post Comments | {comments.length} comments have been written for this post </h2>
                        </TableHeaderColumn>
                    </TableRow>
                    <TableRow>
                            <TableHeaderColumn>id</TableHeaderColumn>
                            <TableHeaderColumn>Author</TableHeaderColumn>
                            <TableHeaderColumn>Vote Score</TableHeaderColumn>
                            <TableHeaderColumn>Delete</TableHeaderColumn>
                            <TableHeaderColumn>Vote</TableHeaderColumn>
                    </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={this.state.showCheckboxes}>  
                        {this.renderCommentList(comments)}
                    </TableBody>
                </Table>
                <div style={{float:'left'}}><Link to={`/comment/${postId}`}><FloatingActionButton mini={true}><ContentAdd /></FloatingActionButton></Link></div>
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