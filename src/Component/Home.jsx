import { Link } from "react-router-dom";
import NavBar from "./Navbar";

function Home() {
    return (
        <div>
            <NavBar/>
            <div className="homepage text-center">
                <Link to="/login">
                <button className="btn bg-primary button" >Get Started</button></Link>
            </div>
            {/* <img className="home_image" src={barber_image} alt="barber-image"/> */}
            
        </div>
    );
}

export default Home;