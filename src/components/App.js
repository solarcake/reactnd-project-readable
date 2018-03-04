import React, { Component } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import * as actions from '../actions/AppActions';
import { connect } from 'react-redux'
import Post from './Post'
import Comment from './Comment'
import Category from './Category'
import NoMatch from './NoMatch'
import Main from './Main'
import AppBar from 'material-ui/AppBar'

class App extends Component {
  componentDidMount() {    
    this.props.loadInitialData();
  }

  render() {
    return(
      <div className="App">
        <AppBar
          title="Udacity Blog - This is the second project for udacity react course"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
      
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

export default withRouter(connect(
  mapStateToProps,
  actions
)(App))