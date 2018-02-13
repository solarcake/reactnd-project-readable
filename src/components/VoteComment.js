import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as BlogAPI from '../BlogAPI'
import {updateComment} from '../actions'

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
        return (
            <div>
                <span className="glyphicon glyphicon-arrow-up" onClick={()=> this.voteUp(comment)}></span>
                <span className="glyphicon glyphicon-arrow-down" onClick={()=> this.voteDown(comment)}></span>
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