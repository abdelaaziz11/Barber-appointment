import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavBar from './Navbar';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "./firebase";
import { toast, ToastContainer } from "react-toastify";

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
            console.log("User Logged in Successfully!!")
            window.location.href="/booking"
            toast.success("User Logged in Successfully!!", {
                position: "top-center",
              });
        } catch (error) {
          console.log(error.message);
          toast.error(error.message, {
            position: "bottom-center",
          });
        }
    }
    return (
        <>
        <NavBar/>
        <div className="container loginpage">
            <div className="form-border border-2">
            <Form className="login-form mx-5 mt-5">
                <h2 className="heading mb-3">Login</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    {/* <Form.Text className="text-muted">
                        It must be more than 6 characters.
                    </Form.Text> */}
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleLogin}>
                    Login
                </Button>
                
                <p className="text-black-50 mt-2">Do not have an account!<Link to="/signup">Create it here.</Link></p>
            </Form>
            </div>
            <ToastContainer/>
        </div>
        </>
    );
}

export default Login;