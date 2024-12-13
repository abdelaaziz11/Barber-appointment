import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./Navbar";
import { auth, db } from "./firebase";
import { Form } from "react-bootstrap";

function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          fullName: fullName,
        });
      }
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <>
      <NavBar />
      <div className="container signuppage ">
        <div className="border-form">
          <h2 className="heading mb-3">Sign Up</h2>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="fullName"
              id="fullName"
              placeholder="Full Name"
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Form.Text className="text-muted">
                        It must be more than 6 characters.
                    </Form.Text>
          </div>
          <br />
          <button className="btn bg-primary mb-2" onClick={handleSignUp}>
            Sign Up
          </button>
          <p className="forgot-password text-right text-black-50">
            Already registered? <Link to="/login">Login here.</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default SignUp;