import * as BlogAPI from '../BlogAPI'
import React, { Component } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import { loadCategories, loadPosts } from '../actions'
import { connect } from 'react-redux'
import Post from './Post'
import Comment from './Comment'
import Category from './Category'
import NoMatch from './NoMatch'
import Main from './Main'

class App extends Component {
   // save in application state 
  
  componentDidMount() {
     // Get all categories to display on front page 
      BlogAPI.getCategories().then((categories) => {
          this.props.loadCategories(categories)
      });

      BlogAPI.getPosts().then((posts) => {
          this.props.loadPosts(posts);
      });      
  }

  render() {
    return(
      <div className="container">
        <div className="page-header">
          <h1>Udacity Blog <small>This is the second project for udacity react course by alan gauci. Hope it looks ok</small></h1>
        </div>
        <Switch>
          <Route exact path="/" component={Main}/> 
          <Route path="/category/:categoryName" component={Category}/>
          <Route exact path="/post" component={Post}/>
          <Route path="/comment/:postId/:commentId" component={Comment}/>
          <Route exact path="/comment/:postId" component={Comment}/>
          <Route path="/:categoryName/:postId" component={Post}/>
          <Route component={NoMatch}/>
        </Switch>
     </div>
    )
  }
}

function mapStateToProps ({categories, posts}) {
  return {
    categories,
    posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadCategories: (data) => dispatch(loadCategories(data)),
    loadPosts: (data) => dispatch(loadPosts(data))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))