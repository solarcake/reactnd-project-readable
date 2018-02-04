import React, { Component } from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux'
export const fields = [ 'body', 'author']

class CommentForm extends Component {
  render() {
    const { fields: { body, author}, handleSubmit, load, pristine, reset, submitting } = this.props
    return (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="body">Body</label>
            <Field name="body" component="input"  type="text" {...body}/>
          </div>
          <div>
            <label htmlFor="author">Author</label>
            <Field name="author" component="input"  type="text" {...author}/>
          </div>
          <button type="submit">Submit</button>
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