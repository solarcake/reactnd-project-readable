import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem';
export const fields = [ 'title', 'body', 'author', 'category' ]

class PostForm extends Component {
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

    const renderSelectField = ({
      input,
      label,
      meta: { touched, error },
      children,
      ...custom
    }) => (
      <SelectField
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}
      />
    )

    const { fields: { title, body, author }, handleSubmit, pristine, submitting } = this.props
    // we need categoies to get a list of valid categories under post
    const categories = this.props.category;
    const editMode = !!this.props.initialValues;
    return (
        <form onSubmit={handleSubmit}>
          <div> 
            <Field name="title" component={renderTextField} label="TITLE" {...title}/>
          </div>
          <div>
            <Field name="body" component={renderTextAreaField} label="BODY" {...body}/>
          </div>
          <div>
              <Field disabled={editMode} name="author" component={renderTextField} label="AUTHOR" {...author}/>          
          </div>
          <div>
          <Field name="category" component={renderSelectField} disabled={editMode} label="CATEGORY">
              {categories.map((category) => (
                <MenuItem key={category.name} value={category.name} primaryText={category.name}/> 
              ))}
          </Field>
          </div>
          <FlatButton primary={true} disabled={pristine || submitting} type="submit">Submit</FlatButton> 
        </form>
      );
  }
}

// Decorate the form component
PostForm = reduxForm({
  form: 'postForm',
  enableReinitialize: true,
  fields
})(PostForm);


function mapStateToProps ({category}) {
  return {
    category
  }
}

export default connect(
  mapStateToProps
)(PostForm)