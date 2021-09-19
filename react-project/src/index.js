import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import api from './api/api';
import test from './utils/test';

React.$api = api; //API接口
React.$test = test; //正则验证

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
