import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BlogAPI from '../BlogAPI'
import { connect } from 'react-redux'
import {loadPostComments} from '../actions/CommentActions'
import DeleteComment from './DeleteComment'
import VoteComment from './VoteComment'
import RaisedButton from 'material-ui/RaisedButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentEdit from 'material-ui/svg-icons/editor/mode-edit';
import Deletedit from 'material-ui/svg-icons/action/delete';


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
            showCheckboxes: false,
            open: false,
            anchorEl: null,
            commentItem: null
        }
    }

    handleOptionsClick = (comment, event) => {
        // This prevents ghost click.
        event.preventDefault();
    
        this.setState({
          open: true,
          commentItem: comment,
          anchorEl: event.currentTarget
        });
    };

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
                <TableRowColumn>{comment.id}</TableRowColumn>
                <TableRowColumn>{comment.author}</TableRowColumn>
                <TableRowColumn>{comment.voteScore}</TableRowColumn>
                <TableRowColumn><span onClick={this.handleOptionsClick.bind(this, comment)}><i className="material-icons">ic_view_headline</i></span></TableRowColumn>
            </TableRow>
        ))
    }

    handleOptionsClose = () => {
        this.setState({
          open: false,
        });
    };

    renderDropDownList() {
        const menuComment = this.state.commentItem;
        return ( <div>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleOptionsClose}
          animation={PopoverAnimationVertical}
        >
          <Menu>
            <VoteComment comment={menuComment} control="menuItem"/>
            {
                menuComment ? 
                <MenuItem><Link to={`/comment/${menuComment.parentId}/${menuComment.id}`}>{<ContentEdit/>}Edit</Link></MenuItem>     
                :<MenuItem>{<ContentEdit/>}Edit</MenuItem>
            }

            {
                menuComment ? 
                <MenuItem>{<Deletedit/>}<DeleteComment comment={menuComment}/></MenuItem> 
                :<MenuItem>{<Deletedit/>}Delete</MenuItem>
            }
          </Menu>
        </Popover>
      </div>)
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
                        <TableHeaderColumn colSpan="4" tooltip="Posts" style={{textAlign: 'left'}}>
                            <h2>Blog Post Comments | {comments.length} comments have been written for this post </h2>
                        </TableHeaderColumn>
                    </TableRow>
                    <TableRow>
                            <TableHeaderColumn>id</TableHeaderColumn>
                            <TableHeaderColumn>Author</TableHeaderColumn>
                            <TableHeaderColumn>Vote Score</TableHeaderColumn>
                            <TableHeaderColumn>&nbsp;</TableHeaderColumn>
                        </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={this.state.showCheckboxes}>  
                                {this.renderCommentList(comments)}
                        </TableBody>
                </Table>
                {this.renderDropDownList()}
                <Link to={`/comment/${postId}`}><FloatingActionButton mini={true}><ContentAdd /></FloatingActionButton></Link>
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