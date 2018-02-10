import React, {Component} from 'react'
import { connect } from 'react-redux'
import PostList from './PostList'
import {Link} from 'react-router-dom'

class Category extends Component {
    render() {
        const category = this.props.category || {};
        const posts = this.props.posts || [];
        return (
            <div>
                <div className="row">
                    <div className="panel panel-info">
                    <div className="panel-heading">{category.name}</div>
                    </div>
                </div>
            <PostList posts={posts} category={category.name}/>
            <Link href="#" to="/">Back to Main</Link>
            </div>
        )
    }
}

function mapStateToProps ({post, category}, ownProps) {
   const categoryName = ownProps.match.params.categoryName;  
   return {
       category: category.filter((cat) => cat.name === categoryName).pop(),
       posts: post.filter((p) => p.category === categoryName)
   }
}
  
export default connect(
    mapStateToProps
)(Category)