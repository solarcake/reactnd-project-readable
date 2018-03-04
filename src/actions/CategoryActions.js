import * as ActionTypes from './types';

export function loadCategories(categories) {
    return {
        type: ActionTypes.LOAD_CATEGORIES,
        categories
    }
}