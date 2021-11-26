import thunkMiddleware from 'redux-thunk';
import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./rootReducer";


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
});

if (process.env.NODE_ENV === 'development' && module.hot){
    module.hot.accept('./reducers', () => {
        store.replaceReducer(rootReducer);
    })
}
