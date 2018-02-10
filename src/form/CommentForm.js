import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
export const fields = [ 'body', 'author']

class CommentForm extends Component {
  render() {
    const { fields: { body, author}, handleSubmit, pristine, submitting } = this.props
    const editMode = !!this.props.initialValues;
    return (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <Field className="form-control" name="body" component="textarea" type="textarea" {...body}/>
          </div>
          <div>
            <label htmlFor="author">Author</label>
            <Field disabled={editMode} className="form-control" name="author" component="input"  type="text" {...author}/>
          </div>
            <button className="btn btn-primary" disabled={pristine || submitting} type="submit">Submit</button>    
        </form>
      );
  }
}

// Decorate the form component
CommentForm = reduxForm({
  form: 'commentForm',
  fields
})(CommentForm);


function mapStateToProps ({comment}) {
  return {
    comment
  }
}

export default connect(
  mapStateToProps
)(CommentForm)