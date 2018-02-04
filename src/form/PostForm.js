import React, { Component } from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux'
export const fields = [ 'title', 'body', 'author', 'category' ]

class PostForm extends Component {
  render() {
    const { fields: { title, body, author, category }, handleSubmit, load, pristine, reset, submitting } = this.props
    // we need categoies to get a list of valid categories under post
    const categories = this.props.category;
    return (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <Field name="title" component="input" type="text" {...title}/>
          </div>
          <div>
            <label htmlFor="body">Body</label>
            <Field name="body" component="input"  type="text" {...body}/>
          </div>
          <div>
            <label htmlFor="author">Author</label>
            <Field name="author" component="input"  type="text" {...author}/>
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <Field name="category" component="select">
                {categories.map((category) => (
                  <option value={category.name}>{category.name}</option> 
                ))}
            </Field>
          </div>
          <button type="submit">Submit</button>
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