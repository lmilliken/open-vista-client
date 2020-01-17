import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers'; //automatically gets index.js store

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './components/theme';
import CssBaseline from '@material-ui/core/CssBaseline';

const reduxStoreEnhancer =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(
  reducers,
  { auth: { token: { token: localStorage.getItem('token') } } },
  compose(applyMiddleware(reduxThunk), reduxStoreEnhancer)
);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.querySelector('#root')
);
