import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import comment from './comment';
import category from './category';
import post from './post';

export default combineReducers({category, post, comment, form: formReducer })