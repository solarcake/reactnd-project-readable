import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as BlogAPI from '../BlogAPI'
import {updatePost} from '../actions/PostActions'
import FlatButton from 'material-ui/FlatButton'
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
                    <span style={{ cursor: 'pointer' }} onClick={()=> this.voteUp(post)}>{<ArrowUp />}</span>
                    <span style={{ cursor: 'pointer' }} onClick={()=> this.voteDown(post)}>{<ArrowDown />}</span>
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

export default connect(
    null,
    mapDispatchToProps
)(Vote)