import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { auth } from "./firebase";

const NavBarLogin = ({ handleLogout }) => (
  <Nav className="me-auto">
    <NavLink to="/dashboard" className="nav-link">
      Appointments
    </NavLink>
    {/* <NavLink to="/book" className="nav-link">
      Book
    </NavLink> */}
    <NavLink to="/booking" className="nav-link">
      Booking
    </NavLink>
    <NavLink to="/login" className="nav-link logout" onClick={handleLogout}>
      Logout
    </NavLink>
  </Nav>
);

const NavBarLogout = () => (
  <Nav className="me-auto">
    <NavLink to="/home" className="nav-link">
      Home
    </NavLink>
    <NavLink to="/signup" className="nav-link">
      SignUp
    </NavLink>
    <NavLink to="/login" className="nav-link">
      Login
    </NavLink>
  </Nav>
);

function NavBar() {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setLogged(!!currentUser);
    });
    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        await auth.signOut();
        window.location.href = "/login";
        console.log("User logged out successfully!");
      } catch (error) {
        console.log("Error logging out:", error.message);
      }
    }
  }

  return (
    <Navbar bg="dark" expand="lg" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Barber</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {logged ? <NavBarLogin handleLogout={handleLogout} /> : <NavBarLogout />}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
