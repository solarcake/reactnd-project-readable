import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PostList from './PostList'
import CategoryList from './CategoryList'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add';

class Main extends Component {
  render() {
    const posts = this.props.post || [];
    const categories = this.props.category || [];
    return(
      <div className="row">
        <CategoryList categories={categories}/>
        <PostList posts={posts}/>
        <Link to='/post'><FloatingActionButton mini={true}><ContentAdd /></FloatingActionButton></Link>
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