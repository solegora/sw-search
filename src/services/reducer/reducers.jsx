import { combineReducers } from '@reduxjs/toolkit'

import {
    filmsReducer,
    FILMS_FEATURE_KEY
} from '../slices/films/films.slice'

import { SEARCH_FEATURE_KEY, searchReducer } from '../slices/search/search.slice'

const appReducer = combineReducers({
    [FILMS_FEATURE_KEY]: filmsReducer,
    [SEARCH_FEATURE_KEY]: searchReducer

})


const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer
