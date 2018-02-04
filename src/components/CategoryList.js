import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          categoryListSortDirection: 'DESC',
          categories: props.categories || []
        }
      }
    
      sortCategoryList(name) {
        let categories = this.state.categories;
        let direction = this.state.categoryListSortDirection
        categories.sort((a, b) => {
           if (direction === 'DESC') {
             return a[name] < b[name];   
           } else {
             return a[name] > b[name];
           }
        });
    
        const changeDirection = direction === 'DESC' ? 'ASEC': 'DESC';
        this.setState({categoryListSortDirection: changeDirection, categories : categories});
      }

      componentWillReceiveProps(props) {
        this.setState({
            categories: props.categories || []
        });
      }
    

    render() {
        const categories = this.state.categories;
        return (
            <div className="categories">
                <h2>Categories</h2>
                <div id="table">
                    <div class="row">
                        <div class="cell" onClick={()=>this.sortCategoryList('name')}>Name <span class="arrow top"></span></div>
                        <div class="cell" onClick={()=>this.sortCategoryList('path')}>Path <span class="arrow top"></span></div> 
                    </div> 
                    {categories.map((category) => (
                    <div class="row">
                        <span class="cell"><Link to={`/category/${category.name}`}>{category.name}</Link></span>
                        <span class="cell">{category.path}</span>
                    </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default CategoryList