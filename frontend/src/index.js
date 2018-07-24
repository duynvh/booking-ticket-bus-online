import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import reducers from './reducers';
import App from './App';

const persistConfig = {
  key: 'root',
  storage,
};

// const persistedReducer = persistReducer(persistConfig, reducers)

// const store = createStore(
//   persistedReducer,
//   {
//     auth: { authenticated: localStorage.getItem('token') }
//   },
//   applyMiddleware(reduxThunk)
// );

// const persistor = persistStore(store);

// ReactDOM.render(
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//         <App />
//       </PersistGate>
//   </Provider>,
//   document.querySelector('#root')
// );

const store = createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem('token') }
  },
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
        <App />
  </Provider>,
  document.querySelector('#root')
);