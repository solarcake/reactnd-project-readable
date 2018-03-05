import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Vote from './Vote'
import DeletePost from './DeletePost'

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

const DEFAULT_COMPONENT_DIRECTION = 'DESC';

class PostList extends Component {    
    constructor(props) {
        super(props);
        this.state = {
          activeControlComponent: 'title',
          activeControlDirection: DEFAULT_COMPONENT_DIRECTION,
          posts: props.posts || [],
          showCheckboxes: false,
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

    renderPostList(posts) {
        return posts.map((p) => (
            <TableRow key={p.id}>
                <TableRowColumn><Link to={`/${p.category}/${p.id}`}>{p.title}</Link></TableRowColumn>
                <TableRowColumn>{p.author}</TableRowColumn>
                <TableRowColumn>{p.voteScore}</TableRowColumn>
                <TableRowColumn>{this.formatDateTimeStamp(p.timestamp)}</TableRowColumn>
                <TableRowColumn>{p.commentCount}</TableRowColumn>
                <TableRowColumn><DeletePost post={p}/></TableRowColumn>
                <TableRowColumn><Vote post={p} control="menuItem"/></TableRowColumn>
            </TableRow>
        ))
    }
    render() {
        const posts = this.state.posts.filter((p) => !p.deleted);
        const activeComponent = this.state.activeControlComponent;
        const activeDirectionInverse = this.state.activeControlDirection === DEFAULT_COMPONENT_DIRECTION ? 'ASC' : DEFAULT_COMPONENT_DIRECTION;
        const directionControls = {
            title:  {
                inverseDirection: activeComponent === 'title' ? activeDirectionInverse: DEFAULT_COMPONENT_DIRECTION,
                className:  activeComponent === 'title' && this.state.activeControlDirection === 'ASC' ? 'expand_less' : 'expand_more',
            },
            author: {
                inverseDirection: activeComponent === 'author' ? activeDirectionInverse: DEFAULT_COMPONENT_DIRECTION,
                className:  activeComponent === 'author' && this.state.activeControlDirection === 'ASC' ? 'expand_less' : 'expand_more',
            },
            voteScore: {
                inverseDirection: activeComponent === 'voteScore' ? activeDirectionInverse: DEFAULT_COMPONENT_DIRECTION,
                className:  activeComponent === 'voteScore' && this.state.activeControlDirection === 'ASC' ? 'expand_less' : 'expand_more',
            },
            timestamp: {
                inverseDirection: activeComponent === 'timestamp' ? activeDirectionInverse: DEFAULT_COMPONENT_DIRECTION,
                className:  activeComponent === 'timestamp' && this.state.activeControlDirection === 'ASC' ? 'expand_less' : 'expand_more',
            }
        }
        return (
            <div>
            <Table>
            <TableHeader
                displaySelectAll={this.state.showCheckboxes}
                adjustForCheckbox={this.state.showCheckboxes}
            >
            <TableRow>
                <TableHeaderColumn colSpan="7" tooltip="Posts" style={{textAlign: 'left'}}>
                    <h2>Blog Posts | {posts.length} Posts have been written </h2>
                </TableHeaderColumn>
            </TableRow>
            <TableRow>
                <TableHeaderColumn><span style={{ cursor: 'pointer' }} onClick={()=>this.sortPostByControl('title', directionControls.title.inverseDirection)}>Title <i className="material-icons">{directionControls.title.className}</i></span></TableHeaderColumn>
                <TableHeaderColumn><span style={{ cursor: 'pointer' }} href="#"onClick={()=>this.sortPostByControl('author', directionControls.author.inverseDirection)}>Author <i className="material-icons">{directionControls.author.className}</i></span></TableHeaderColumn>
                <TableHeaderColumn><span style={{ cursor: 'pointer' }} href="#" onClick={()=>this.sortPostByControl('voteScore', directionControls.voteScore.inverseDirection)}>Vote Score <i className="material-icons">{directionControls.voteScore.className}</i></span></TableHeaderColumn>
                <TableHeaderColumn><span style={{ cursor: 'pointer' }} href="#" onClick={()=>this.sortPostByControl('timestamp', directionControls.timestamp.inverseDirection)}>Created time <i className="material-icons">{directionControls.timestamp.className}</i></span></TableHeaderColumn>
                <TableHeaderColumn>Comment Count</TableHeaderColumn>
                <TableHeaderColumn>Delete</TableHeaderColumn>
                <TableHeaderColumn>Vote</TableHeaderColumn>
            </TableRow>
            </TableHeader> 

            <TableBody
                displayRowCheckbox={this.state.showCheckboxes}>  
                {this.renderPostList(posts)}
            </TableBody>
            </Table>
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
    mapStateToProps
)(PostList)