import {LOAD_CATEGORIES} from '../actions/types'

export default function category(state = [], action) {
    const {categories, type } = action;
    switch (type) {
        case LOAD_CATEGORIES:
            return categories;
        default:
            return state;
    }
}