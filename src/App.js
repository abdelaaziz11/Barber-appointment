import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from './Component/Home';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Component/Login';
import SignUp from './Component/SignUp';
import Dashboard from './Component/Dashboard';
import { auth } from './Component/firebase';
import Book from './Component/Book';
import Booking from './Component/Booking';


function App() {
  const [user, setUser] = useState();
  useEffect(()=> {
    auth.onAuthStateChanged((user)=>{
      setUser(user);
    });
  });
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home/>} />
              <Route path="/home" element={<Home/>} />
              <Route path="/booking" element={<Booking auth={auth} />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<SignUp/>} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/book" element={<Book/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
