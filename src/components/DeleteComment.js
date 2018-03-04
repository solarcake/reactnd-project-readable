import React, {Component} from 'react';
import * as BlogAPI from '../BlogAPI'
import {updateComment} from '../actions/CommentActions'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'

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
        const buttonControl = this.props.control === 'button'
        return (
            buttonControl ? 
            <FlatButton primary={true} onClick={()=> this.removeComment(comment)}>Delete Comment</FlatButton>
            :
            <span onClick={()=> this.removeComment(comment)}>Delete Comment</span>
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


