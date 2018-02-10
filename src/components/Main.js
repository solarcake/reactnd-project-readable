import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PostList from './PostList'
import CategoryList from './CategoryList'

class Main extends Component {
  render() {
    const posts = this.props.post || [];
    const categories = this.props.category || [];
    return(
      <div className="row">
        <CategoryList categories={categories}/>
        <PostList posts={posts}/>
        <Link to='/post'>New Post</Link>
     </div>
    )
  }
}

function mapStateToProps ({category, post}) {
  return {
    category,
    post
  }
}

export default connect(
  mapStateToProps
)(Main)