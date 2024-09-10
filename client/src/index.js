import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import LoadableApp from './root/RootRouter.js';

// REDUX
import { Provider } from 'react-redux';
import store from './store/Store';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <Provider store={store}>
      <LoadableApp />
  </Provider>,
  document.getElementById('root')
);