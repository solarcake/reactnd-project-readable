import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as BlogAPI from '../BlogAPI'
import {updatePost} from '../actions'

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
        return (
            <div>
                <span className="glyphicon glyphicon-arrow-up" onClick={()=> this.voteUp(post)}></span>
                <span className="glyphicon glyphicon-arrow-down" onClick={()=> this.voteDown(post)}></span>
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