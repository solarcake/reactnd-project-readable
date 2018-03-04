import * as BlogAPI from '../BlogAPI';
import {loadCategories} from './CategoryActions'
import {loadPosts} from './PostActions'

export function loadInitialData() {
    return (dispatch) => {
        BlogAPI.getCategories()
        .then((categories) => dispatch(loadCategories(categories)))
        .then(() => BlogAPI.getPosts())
        .then((posts) =>  dispatch(loadPosts(posts)))  
      }
}