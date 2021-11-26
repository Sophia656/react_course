import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './App.css';
import MyNavbar from './components/UI/navbar/MyNavbar';

ReactDOM.render(
  <BrowserRouter>
    <MyNavbar />
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
