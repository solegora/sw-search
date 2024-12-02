import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducer/reducers';
import { epicMiddleware, listenerInstance, middlewareConfig, rootEpic } from '../../middleware/middleware';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(middlewareConfig)
            .prepend(listenerInstance.middleware)
            .concat([epicMiddleware]),
})



epicMiddleware.run(rootEpic)

export default store
