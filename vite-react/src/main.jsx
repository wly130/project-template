import React from 'react';
import { createRoot } from 'react-dom/client';
import { AliveScope } from 'react-activation';
import App from './App.jsx';
import './index.css';
import { HashRouter } from 'react-router-dom';
import api from "./api/api.jsx";

React.$api = api;

const root = createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <AliveScope>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AliveScope>
  </HashRouter>
)
