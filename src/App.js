import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Component/Home";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Component/Login";
import SignUp from "./Component/SignUp";
import Dashboard from "./Component/Dashboard";
import { auth, db } from "./Component/firebase";
import Book from "./Component/Book";
import Booking from "./Component/Booking";
import AdminDashboard from "./Component/AdminDashboard";
import { doc, getDoc } from "firebase/firestore";


function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "Users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserRole(userData.role || "user");
        }
      } else {
        setUserRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const ProtectedRoute = ({ isAdmin, children }) => {
    if (!isAdmin) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/booking" element={<Booking auth={auth} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              {/* <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" replace />} /> */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/book" element={<Book />} />
              <Route path="/admin-dashboard" element={
                <ProtectedRoute isAdmin={userRole === "admin"}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
