import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Vote from './Vote'
import DeletePost from './DeletePost'
const DEFAULT_COMPONENT_DIRECTION = 'DESC';

class PostList extends Component {    
    constructor(props) {
        super(props);
        this.state = {
          activeControlComponent: 'title',
          activeControlDirection: DEFAULT_COMPONENT_DIRECTION,
          posts: props.posts || []
        }
    }

    sortPostByControl(name, direction, posts = this.state.posts) {
        posts.sort((a, b)=> {
            if (direction === DEFAULT_COMPONENT_DIRECTION) {
                return a[name] < b[name];  
            } else {
                return a[name] > b[name];
            }
        });

        this.setState({
            activeControlDirection: direction, 
            activeControlComponent: name,
            posts : posts
        });
    }

    componentWillReceiveProps(props) {
        this.sortPostByControl( 
            this.state.activeControlComponent, 
            this.state.activeControlDirection,
            [].concat(props.posts))
    }
    
    formatDateTimeStamp(timestamp) {
        let createdDate = new Date(timestamp)
        return createdDate.toISOString();
    }

    render() {
        const posts = this.state.posts.filter((p) => !p.deleted);
        const activeComponent = this.state.activeControlComponent;
        const activeDirectionInverse = this.state.activeControlDirection === DEFAULT_COMPONENT_DIRECTION ? 'ASC' : DEFAULT_COMPONENT_DIRECTION;
        const directionControls = {
            title:  {
                inverseDirection: activeComponent === 'title' ? activeDirectionInverse: DEFAULT_COMPONENT_DIRECTION,
                className:  activeComponent === 'title' && this.state.activeControlDirection === 'ASC' ? 'glyphicon glyphicon-chevron-up' : 'glyphicon glyphicon-chevron-down',
            },
            author: {
                inverseDirection: activeComponent === 'author' ? activeDirectionInverse: DEFAULT_COMPONENT_DIRECTION,
                className:  activeComponent === 'author' && this.state.activeControlDirection === 'ASC' ? 'glyphicon glyphicon-chevron-up' : 'glyphicon glyphicon-chevron-down',
            },
            voteScore: {
                inverseDirection: activeComponent === 'voteScore' ? activeDirectionInverse: DEFAULT_COMPONENT_DIRECTION,
                className:  activeComponent === 'voteScore' && this.state.activeControlDirection === 'ASC' ? 'glyphicon glyphicon-chevron-up' : 'glyphicon glyphicon-chevron-down',
            },
            timestamp: {
                inverseDirection: activeComponent === 'timestamp' ? activeDirectionInverse: DEFAULT_COMPONENT_DIRECTION,
                className:  activeComponent === 'timestamp' && this.state.activeControlDirection === 'ASC' ? 'glyphicon glyphicon-chevron-up' : 'glyphicon glyphicon-chevron-down',
            }
        }
        return (
            <div className="row">
            <div className="panel panel-default">
            <div className="panel-heading">Listing {posts.length} Posts for this category</div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th onClick={()=>this.sortPostByControl('title', directionControls.title.inverseDirection)}>Title <span className={directionControls.title.className}></span></th>
                        <th onClick={()=>this.sortPostByControl('author', directionControls.author.inverseDirection)}>Author <span className={directionControls.author.className}></span></th>
                        <th onClick={()=>this.sortPostByControl('voteScore', directionControls.voteScore.inverseDirection)}>Vote Score <span className={directionControls.voteScore.className}></span></th>
                        <th onClick={()=>this.sortPostByControl('timestamp', directionControls.timestamp.inverseDirection)}>Created time <span className={directionControls.timestamp.className}></span></th>
                        <th>Vote</th>
                        <th>Delete</th>
                    </tr>  
               </thead>
               <tbody>   
                {posts.map((p) => (
                    <tr key={p.id}>
                        <td><Link to={`/post/${p.id}`}>{p.title}</Link></td>
                        <td>{p.author}</td>
                        <td>{p.voteScore}</td>
                        <td>{this.formatDateTimeStamp(p.timestamp)}</td>
                        <td><Vote post={p}/></td>
                        <td><DeletePost post={p}/></td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
          </div>
        )
    }
}

function mapStateToProps ({post}, ownProps) {
    const categoryName = ownProps.category;

    if (categoryName) {
        return {
            posts: post.filter((p) => p.category === categoryName)   
        }
    }

    return  {
        posts: post
    }
}
  
export default connect(
    mapStateToProps,
    {}
)(PostList)