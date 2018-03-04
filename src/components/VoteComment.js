import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as BlogAPI from '../BlogAPI'
import {updateComment} from '../actions/CommentActions'
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-drop-up';


class VoteComment extends Component {
    voteUp(comment) {
       const {updateComment} = this.props;
       return BlogAPI.upVoteComment(comment).then((response) => {
            updateComment(response);
        });
    }

    async voteDown(comment) {
        const {updateComment} = this.props;
        const response = await BlogAPI.downVoteComment(comment);
        updateComment(response);
    }

    render() {
        const comment = this.props.comment;
        const menuItemControl = this.props.control === 'menuItem';
        return (
            <div>
            {menuItemControl ?
                <div>
                    <MenuItem><span onClick={()=> this.voteUp(comment)}>{<ArrowUp />}Vote up</span></MenuItem>
                    <MenuItem><span onClick={()=> this.voteDown(comment)}>{<ArrowDown />}Vote Down</span></MenuItem>
                </div> 
                :
                <div>
                    <span onClick={()=> this.voteUp(comment)}><FlatButton label="Vote Up" labelPosition="before" primary={true}icon={<ArrowUp />}/></span>
                    <span onClick={()=> this.voteDown(comment)}><FlatButton label="Vote Down" labelPosition="before" primary={true}icon={<ArrowDown/>}/></span>
                </div>
            }
            </div>          
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
        updateComment: (data) => dispatch(updateComment(data))
    }
}

function mapStateToProps() {
    return {};
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VoteComment)