import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

const DEFAULT_COMPONENT_DIRECTION = 'DESC';

class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          categoryListSortDirection: DEFAULT_COMPONENT_DIRECTION,
          categories: props.categories || [],
          showCheckboxes: false
        }
      }
    
      sortCategoryList(name) {
        let categories = this.state.categories;
        const direction = this.state.categoryListSortDirection
        categories.sort((a, b) => {
           if (direction === DEFAULT_COMPONENT_DIRECTION) {
             return a[name] < b[name];   
           } else {
             return a[name] > b[name];
           }
        });
    
        const changeDirection = direction === DEFAULT_COMPONENT_DIRECTION ? 'ASC': DEFAULT_COMPONENT_DIRECTION;
        this.setState({
            categoryListSortDirection: changeDirection, 
            categories : categories
        });
      }

      componentWillReceiveProps(props) {
        this.setState({
            categories: props.categories || []
        });
      }

      renderChildList(categories) {
        return categories.map((category) => (
            <TableRow key={category.name}>
                <TableRowColumn><Link to={`/category/${category.name}`}>{category.name}</Link></TableRowColumn>
                <TableRowColumn>{category.path}</TableRowColumn>
            </TableRow>
        ))
      }
    
      render() {
        const categories = this.state.categories;
        let categoryArrowClass = this.state.categoryListSortDirection === DEFAULT_COMPONENT_DIRECTION ? 'expand_more' : 'expand_less'
        return (
            <Table>
            <TableHeader
                displaySelectAll={this.state.showCheckboxes}
                adjustForCheckbox={this.state.showCheckboxes}
            >
            <TableRow>
                <TableHeaderColumn colSpan="2" tooltip="Categories" style={{textAlign: 'left'}}>
                   <h2>Blog Categories</h2>
                </TableHeaderColumn>
            </TableRow>
            <TableRow>
                <TableHeaderColumn><span onClick={()=>this.sortCategoryList('name')}>Name <i className="material-icons">{categoryArrowClass}</i> </span></TableHeaderColumn>
                <TableHeaderColumn><span onClick={()=>this.sortCategoryList('path')}>Path <i className="material-icons">{categoryArrowClass}</i> </span></TableHeaderColumn>
            </TableRow>
            </TableHeader> 

            <TableBody
                displayRowCheckbox={this.state.showCheckboxes}
            >
                 {this.renderChildList(categories)}
            </TableBody>
            </Table>
        )
    }
}

export default CategoryList