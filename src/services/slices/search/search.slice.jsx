import { createSlice } from '@reduxjs/toolkit'
import { mergeMap, filter } from 'rxjs/operators'
import { of } from 'rxjs'

import { ENV } from '../../utils/endpoints'
import { successResponse } from '../../helpers/httpHelper'
import axios from 'axios'


export const SEARCH_FEATURE_KEY = 'search'

/*
 * Create our slice
 */
export const searchSlice = createSlice({
	name: SEARCH_FEATURE_KEY,
	initialState: {},
	reducers: {
		SEARCH: (state) => {
			state.loading = true
			delete state.error
			delete state.serverError
		},
		SEARCH_SUCCESS: (state, action) => {
			state.loading = false
			state.data = action.payload.data
		},
		SEARCH_ERROR: (state, action) => {
			state.error = action.payload.error
			state.serverError = action.payload.serverError || action.payload
			state.loading = false
		},

	},
})

/*
 * Export reducer for store configuration.
 */
export const searchReducer = searchSlice.reducer

/*
 * Export actions
 */
export const { SEARCH, SEARCH_SUCCESS, SEARCH_ERROR } = searchSlice.actions

/*
 * Set up the redux-observable epic
 */
export const searchEpic = (action$) => action$.pipe(filter(SEARCH.match), mergeMap(searchService(action$)))

/*
 * Do API calls
 */
const searchService = () => (action) => {
	axios.get(ENV.SWAP_SEARCH, {
		params: action.payload
	})
		.then(response => {
			searchSuccess(response.data);
		})
		.catch(error => {
			searchError(action)(error);
		});
};

/*
 * Dispatch actions based on API responses
 */
const searchSuccess = (response) => {
	return {
		type: SEARCH_SUCCESS.type,
		payload: successResponse(response.response || response),
	}
}
const searchError = (action) => (response) => of({ type: SEARCH_ERROR.type, payload: successResponse(response, action) })
