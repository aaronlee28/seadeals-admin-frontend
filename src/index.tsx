import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import moment from 'moment-timezone';
import App from './App';
import { AuthProvider } from './context/AuthContext';

moment.tz.setDefault(process.env.REACT_APP_TZ);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <HashRouter>
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </AuthProvider>
  </HashRouter>,
);
