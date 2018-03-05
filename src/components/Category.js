import React, {Component} from 'react'
import { connect } from 'react-redux'
import PostList from './PostList'
import {Link} from 'react-router-dom'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentHome from 'material-ui/svg-icons/action/home';
class Category extends Component {
   
    render() {
        const category = this.props.category || {};
        const posts = this.props.posts || [];
        return (
        <div>
            <h2>Category | {category.name}</h2>
            <PostList posts={posts} category={category.name}/>
            <div>
                <Link href="#" to="/"><FloatingActionButton mini={true}><ContentHome /></FloatingActionButton></Link>
            </div>
            <div>
                <Link to='/post'><FloatingActionButton mini={true}><ContentAdd /></FloatingActionButton></Link>
            </div>
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