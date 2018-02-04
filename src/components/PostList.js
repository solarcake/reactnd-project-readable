import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          voteScoreListDirection: 'DESC',
          posts: props.posts || []
        }
    }

    sortPostByVoteScore(name) {
        let posts = this.state.posts;
        let direction = this.state.voteScoreListDirection
        posts.sort((a, b) => {
           if (direction === 'DESC') {
             return a[name] < b[name];   
           } else {
             return a[name] > b[name];
           }
        });
    
        const changeDirection = direction === 'DESC' ? 'ASEC': 'DESC';
        this.setState({voteScoreListDirection: changeDirection, posts : posts});
      }

      componentWillReceiveProps(props) {
        this.setState({
            posts: props.posts || []
        });
      }
    
      formatDateTimeStamp(timestamp) {
        let createdDate = new Date(timestamp)
        return createdDate.toISOString();
      }

    render() {
        const posts = this.state.posts;
        return (
            <div className="posts">
            <h2>Posts</h2>
             <div id="table">   
               <div class="row">
                 <span class="cell" onClick={()=>this.sortPostByVoteScore('title')}>Title <span class="arrow top"></span></span>
                 <span class="cell" onClick={()=>this.sortPostByVoteScore('author')}>Author <span class="arrow top"></span></span>
                 <span class="cell" onClick={()=>this.sortPostByVoteScore('voteScore')}>Vote Score <span class="arrow top"></span></span>
                 <span class="cell" onClick={()=>this.sortPostByVoteScore('timestamp')}>Created time <span class="arrow top"></span></span>  
               </div>   
               {posts.map((post) => (
                 <div class="row">
                   <span class="cell"><Link to={`/post/${post.id}`}>{post.title}</Link></span>
                   <span class="cell">{post.author}</span>
                   <span class="cell">{post.voteScore}</span>
                   <span class="cell">{this.formatDateTimeStamp(post.timestamp)}</span>
                 </div>
               ))}
             </div>  
          </div>
        )
    }
}

export default PostList