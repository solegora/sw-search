
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { createListenerMiddleware } from '@reduxjs/toolkit'
import { searchEpic } from '../services/slices/search/search.slice'
import { filmsEpic } from '../services/slices/films/films.slice'

const rootEpic = combineEpics(
    searchEpic,
    filmsEpic

)

const listenerInstance = createListenerMiddleware({
    extra: { worker: null, serviceWoker: null },
    onError: (error, errorInfo) => {
        console.error(error, errorInfo)
        reportError(error)
    },
})



const epicMiddleware = createEpicMiddleware()

const middlewareConfig = {
    thunk: true,
    immutableCheck: false,
    serializableCheck: false,
}


export { rootEpic, epicMiddleware, middlewareConfig, listenerInstance }