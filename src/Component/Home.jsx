import { Link } from "react-router-dom";
import NavBar from "./Navbar";

function Home() {
    return (
        <div>
            <NavBar/>
            <div className="homepage text-center">
                <h1 className="headinghome text-white fw-bold">Welcome to our Barber Shop</h1>
                <p className="text-white">here is where you can get an appointment</p>
                <Link to="/login">
                <button className="btn bg-primary text-white" >Get Started</button></Link>
            </div>
            {/* <img className="home_image" src={barber_image} alt="barber-image"/> */}
            
        </div>
    );
}

export default Home;