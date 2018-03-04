import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as BlogAPI from '../BlogAPI'
import {updatePost} from '../actions/PostActions'
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-drop-up';


class Vote extends Component {
    voteUp(post) {
       const {updatePost} = this.props;
       return BlogAPI.upVote(post).then((response) => {
            updatePost(response);
        });
    }

    async voteDown(post) {
        const {updatePost} = this.props;
        const response = await BlogAPI.downVote(post);
        updatePost(response);
    }

    render() {
        const post = this.props.post;
        const menuItemControl = this.props.control === 'menuItem';
        return (
            <div>
            {menuItemControl ?
                <div>
                    <MenuItem><span onClick={()=> this.voteUp(post)}>{<ArrowUp />}Vote up</span></MenuItem>
                    <MenuItem><span onClick={()=> this.voteDown(post)}>{<ArrowDown />}Vote Down</span></MenuItem>
                </div> 
                :
                <div>
                    <span onClick={()=> this.voteUp(post)}><FlatButton label="Vote Up" labelPosition="before" primary={true}icon={<ArrowUp />}/></span>
                    <span onClick={()=> this.voteDown(post)}><FlatButton label="Vote Down" labelPosition="before" primary={true}icon={<ArrowDown/>}/></span>
                </div>
            }
            </div>          
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
        updatePost: (data) => dispatch(updatePost(data))
    }
}

function mapStateToProps() {
    return {};
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Vote)