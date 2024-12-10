import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { auth } from "./firebase";

const NavBarLogin = () => {
    async function handleLogout() {
        try{
            await auth.signOut();
            window.location.href="/login";
            console.log("User mogged out Successfully !!");
        } catch (error) {
            console.log("Error logging out:", error.message);
        }
    }

    return (
        <Nav className="me-auto">
            <Link to="/dashboard">Appointments</Link>
            <Link to="/book">Book</Link>
            <Link to="/login" className="logout bg-primary " onClick={handleLogout}>Logout</Link>
        </Nav>
    )
}

const NavBarLogout = () => {
    return (
        <Nav className="me-auto">
            <Link to="/home">Home</Link>
            <Link to="/signup">SignUp</Link>
            <Link to="/login">Login</Link>
        </Nav>
    );
}

function NavBar() {
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        // Listen to auth state changes
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setLogged(!!user); // Set logged to true if user exists
        });

        // Cleanup the listener when component unmounts
        return () => unsubscribe();
    }, []);


    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/" >Barber</Navbar.Brand>
                    {logged ? <NavBarLogin /> : <NavBarLogout />}
                </Container>
            </Navbar>

        </div>
    )
}
export default NavBar;