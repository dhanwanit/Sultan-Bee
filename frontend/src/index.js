import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Provider} from 'react-redux'
import store from "./store"
ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
  
     <App />
    
  </BrowserRouter>
  </Provider>
,
  document.getElementById('root')
);

