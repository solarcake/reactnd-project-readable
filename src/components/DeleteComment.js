import React, {Component} from 'react';
import * as BlogAPI from '../BlogAPI'
import {updateComment} from '../actions'
import { connect } from 'react-redux'

class DeleteComment extends Component {
    removeComment(comment) {
        const updateComment= this.props.updateComment;
        BlogAPI.removeComment(comment).then((response) => {
            updateComment(response);
        });
    }

    render() {
        const comment = this.props.comment;
        return (
            <span className="glyphicon glyphicon-remove" onClick={()=> this.removeComment(comment)}></span>
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
)(DeleteComment)


