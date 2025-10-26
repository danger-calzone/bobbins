// app/configureStore.js

import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';

export default function configureAppStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: createReducer(),
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: false, // Disable thunk if you're only using sagas
        serializableCheck: false,
      }).concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState,
  });

  // Enable dynamic reducer injection
  store.injectedReducers = {}; // Reducer registry
  store.injectReducer = (key, reducer) => {
    if (store.injectedReducers[key]) return;
    store.injectedReducers[key] = reducer;
    store.replaceReducer(createReducer(store.injectedReducers));
  };

  // Enable dynamic saga injection
  store.runSaga = sagaMiddleware.run;
  store.injectedSagas = {}; // Saga registry

  return store;
}
