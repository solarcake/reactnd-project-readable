import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

export const fields = [ 'body', 'author']

class CommentForm extends Component {
  render() {
    const renderTextField = ({
      input,
      label,
      meta: { touched, error },
      ...custom
    }) => (
      <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
      />
    )

    const renderTextAreaField = ({
      input,
      label,
      meta: { touched, error },
      ...custom
    }) => (
      <TextField
        hintText={label}
        floatingLabelText={label}
        multiLine={true}
        rows={2}
        rowsMax={4}
        errorText={touched && error}
        {...input}
        {...custom}
      />
    )

    const { fields: { body, author}, handleSubmit, pristine, submitting } = this.props
    const editMode = !!this.props.initialValues;
    return (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <Field name="body" component={renderTextAreaField} label="BODY" {...body}/>
          </div>
          <div>
            <Field disabled={editMode} name="author" component={renderTextField} label="AUTHOR" {...author}/>  
          </div>
          <FlatButton primary={true} disabled={pristine || submitting} type="submit">Submit</FlatButton>  
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