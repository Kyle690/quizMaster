import React from "react";
import ReactDOM from 'react-dom';
import {Provider}from 'react-redux';
import {createStore,applyMiddleware,compose} from "redux";
import reduxThunk from 'redux-thunk';
import Reducers from './store/reducers';
import App from "./App";

import "./assets/scss/material-kit-react.scss";
import "./assets/css/main.css";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(Reducers,composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
