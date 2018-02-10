import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
export const fields = [ 'title', 'body', 'author', 'category' ]

class PostForm extends Component {
  render() {
    const { fields: { title, body, author }, handleSubmit, pristine, submitting } = this.props
    // we need categoies to get a list of valid categories under post
    const categories = this.props.category;
    const editMode = !!this.props.initialValues;
    return (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <Field className="form-control" name="title" component="input" type="text" {...title}/>
          </div>
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <Field className="form-control" name="body" component="textarea"  type="textarea" {...body}/>
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <Field disabled={editMode} className="form-control" name="author" component="input"  type="text" {...author}/>
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <Field disabled={editMode} className="form-control" name="category" component="select">
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>{category.name}</option> 
                ))}
            </Field>
          </div>
            <button className="btn btn-primary" disabled={pristine || submitting} type="submit">Submit</button> 
        </form>
      );
  }
}

// Decorate the form component
PostForm = reduxForm({
  form: 'postForm',
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