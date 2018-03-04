import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Vote from './Vote'
import DeletePost from './DeletePost'
import RaisedButton from 'material-ui/RaisedButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ContentEdit from 'material-ui/svg-icons/editor/mode-edit';
import Deletedit from 'material-ui/svg-icons/action/delete';

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
          open: false,
          menuItemPost: null
        }
    }

    handleOptionsClick = (post, event) => {
        // This prevents ghost click.
        event.preventDefault();
    
        this.setState({
          open: true,
          menuItemPost: post,
          anchorEl: event.currentTarget
        });
    };
    
    handleOptionsClose = () => {
        this.setState({
          open: false,
        });
    };

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
                <TableRowColumn>{p.title}</TableRowColumn>
                <TableRowColumn>{p.author}</TableRowColumn>
                <TableRowColumn>{p.voteScore}</TableRowColumn>
                <TableRowColumn>{this.formatDateTimeStamp(p.timestamp)}</TableRowColumn>
                <TableRowColumn>{p.commentCount}</TableRowColumn>
                <TableRowColumn><span onClick={this.handleOptionsClick.bind(this, p)}><i className="material-icons">ic_view_headline</i></span></TableRowColumn>
            </TableRow>
        ))
    }
    
    renderDropList() {
        const menuItemPost = this.state.menuItemPost;
        return ( <div>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleOptionsClose}
          animation={PopoverAnimationVertical}
        >
          <Menu>
            <Vote post={menuItemPost} control="menuItem"/>
            {
                menuItemPost ? 
                <MenuItem><Link to={`/${menuItemPost.category}/${menuItemPost.id}`}>{<ContentEdit/>}Edit</Link></MenuItem>     
                :<MenuItem>{<ContentEdit/>}Edit</MenuItem>
            }

            {
                menuItemPost ? 
                <MenuItem>{<Deletedit/>}<DeletePost post={menuItemPost}/></MenuItem> 
                :<MenuItem>{<Deletedit/>}Delete</MenuItem>
            }
          </Menu>
        </Popover>
      </div>)
    }

    render() {
        const posts = this.state.posts.filter((p) => !p.deleted);
        const comments = this.props.comments;
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
                <TableHeaderColumn colSpan="6" tooltip="Posts" style={{textAlign: 'left'}}>
                    <h2>Blog Posts | {posts.length} Posts have been written </h2>
                </TableHeaderColumn>
            </TableRow>
            <TableRow>
                <TableHeaderColumn><span onClick={()=>this.sortPostByControl('title', directionControls.title.inverseDirection)}>Title <i className="material-icons">{directionControls.title.className}</i></span></TableHeaderColumn>
                <TableHeaderColumn><span onClick={()=>this.sortPostByControl('author', directionControls.author.inverseDirection)}>Author <i className="material-icons">{directionControls.author.className}</i></span></TableHeaderColumn>
                <TableHeaderColumn><span onClick={()=>this.sortPostByControl('voteScore', directionControls.voteScore.inverseDirection)}>Vote Score <i className="material-icons">{directionControls.voteScore.className}</i></span></TableHeaderColumn>
                <TableHeaderColumn><span onClick={()=>this.sortPostByControl('timestamp', directionControls.timestamp.inverseDirection)}>Created time <i className="material-icons">{directionControls.timestamp.className}</i></span></TableHeaderColumn>
                <TableHeaderColumn>Comment Count</TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
            </TableHeader> 

            <TableBody
                displayRowCheckbox={this.state.showCheckboxes}>  
                {this.renderPostList(posts)}
            </TableBody>
            </Table>
            {this.renderDropList()}
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