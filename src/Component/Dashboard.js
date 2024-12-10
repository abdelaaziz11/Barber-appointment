//import { auth } from "./firebase";
import NavBar from "./Navbar";

function Dashboard({date, fname, lname, number}) {
    const handleDelete = () => {
        console.log("deleted !!")
    }
    return (
        <>
        <NavBar/>
        <div className="container text-center">

            <h1>WELCOME to the Dashboard</h1>
            <p>Your Appointments</p>
            <div className="appointment d-flex justify-content-center">
                <div className="apointment-table">
                    <ul>
                        <li>Appointment Date : {date} </li>
                        <li>First Name : {fname} </li>
                        <li>Last Name : {lname} </li>
                        <li>Phone Number : {number} </li>
                    </ul>
                    <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
        </>
    );
}

export default Dashboard;