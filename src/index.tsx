import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import setupAxios from './config/axios.config';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ReactDOM from 'react-dom/client';
import UpdateSupplierProvider from './shared/reducers/registrationContext';
import { env } from 'process';

setupAxios();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <GoogleOAuthProvider clientId="840350238281-5iechd2hmdl97499lvvj1nqlec2h28dn.apps.googleusercontent.com">
      <Router>
        <UpdateSupplierProvider>
          <ToastContainer />
          <App />
        </UpdateSupplierProvider>
      </Router>
    </GoogleOAuthProvider>
);

reportWebVitals();
