import React, {Component} from 'react';
import * as BlogAPI from '../BlogAPI'
import {updateComment} from '../actions'
import { connect } from 'react-redux'

class DeleteComment extends Component {
    removeComment(comment) {
        const updateComment= this.props.updateComment;
        const onSubmit = this.props.onSubmit;
        BlogAPI.removeComment(comment)
        .then((response) => {
            updateComment(response);
        }).then(()=> {
            if (onSubmit) {
                onSubmit('Comment Deleted');
            }
        });
    }

    render() {
        const comment = this.props.comment;
        return (
            <button type="button" onClick={()=> this.removeComment(comment)} className="btn btn-danger">Delete Comment</button>
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


