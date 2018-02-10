import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const DEFAULT_COMPONENT_DIRECTION = 'DESC';

class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          categoryListSortDirection: DEFAULT_COMPONENT_DIRECTION,
          categories: props.categories || []
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
    

    render() {
        const categories = this.state.categories;
        let categoryArrowClass = this.state.categoryListSortDirection === DEFAULT_COMPONENT_DIRECTION ? ' glyphicon glyphicon-chevron-down' : 'glyphicon glyphicon-chevron-up'
        return (
            <div className="row">
                <div className="panel panel-default">
                <div className="panel-heading">Categories</div>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th onClick={()=>this.sortCategoryList('name')}>Name <span className={categoryArrowClass}></span></th>
                        <th onClick={()=>this.sortCategoryList('path')}>Path</th> 
                    </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                        <tr key={category.name}>
                            <td><Link to={`/category/${category.name}`}>{category.name}</Link></td>
                            <td>{category.path}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default CategoryList