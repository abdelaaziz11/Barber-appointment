import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import { auth } from './Component/firebase';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <RouterProvider router={router}/>
  <React.StrictMode>
    <App auth={auth} />
  </React.StrictMode>
);

