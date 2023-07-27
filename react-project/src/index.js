import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from 'react-router-dom';
import { AliveScope } from 'react-activation';
import "./index.css";
import App from "./App";
import api from "./api/api";
import test from './utils/test';

React.$api = api; //API接口
React.$test = test; //正则验证

const root = createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
        <AliveScope>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </AliveScope>
    </HashRouter>
);
