import { createSlice } from '@reduxjs/toolkit'
import { mergeMap, filter } from 'rxjs/operators'
// import { of } from 'rxjs'

import { ENV } from '../../utils/endpoints'
import { successResponse } from '../../helpers/httpHelper'
import axios from 'axios'


export const FILMS_FEATURE_KEY = 'films'

/*
 * Create our slice
 */
export const filmsSlice = createSlice({
    name: FILMS_FEATURE_KEY,
    initialState: {},
    reducers: {
        FILMS: (state) => {
            state.loading = true
        },
        FILMS_SUCCESS: (state, action) => {
            state.loading = false
            state.data = action.payload.data
        },
        FILMS_ERROR: (state, action) => {
            state.error = action.payload.error
            state.serverError = action.payload.serverError || action.payload
            state.loading = false
        },

    },
})

/*
 * Export reducer for store configuration.
 */
export const filmsReducer = filmsSlice.reducer

/*
 * Export actions
 */
export const { FILMS, FILMS_SUCCESS, FILMS_ERROR } = filmsSlice.actions

/*
 * Set up the redux-observable epic
 */
export const filmsEpic = (action$) =>
    action$.pipe(
        filter(FILMS.match),
        mergeMap((action) => filmsService(action)) // Execute the service with the action
    );

/*
 * Do API calls
 */
const filmsService = () =>
    axios.get(ENV.GET_ALL_FILMS)
        .then((response) => ({
            type: FILMS_SUCCESS.type,
            payload: successResponse(response.data),
        }))
        .catch((error) => ({
            type: FILMS_ERROR.type,
            payload: successResponse(error),
        }));

