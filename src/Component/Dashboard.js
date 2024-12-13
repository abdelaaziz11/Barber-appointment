import { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import NavBar from "./Navbar";

function Dashboard() {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "reservations"));
                const fetchedReservations = querySnapshot.docs.map((doc) => ({
                    id: doc.id, // Include document ID for potential delete operations
                    ...doc.data(),
                }));
                setReservations(fetchedReservations);
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        };

        fetchReservations();
    }, []);

     // Delete a reservation
     const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "reservations", id)); // Remove the reservation from Firestore
            setReservations((prev) => prev.filter((reservation) => reservation.id !== id)); // Update the local state
            console.log(`Reservation with ID: ${id} deleted successfully.`);
        } catch (error) {
            console.error("Error deleting reservation:", error);
        }
    };

    return (
        <>
            <NavBar />
            <div className="container text-center">
                <h1>WELCOME to the Dashboard</h1>
                <p>Your Appointments</p>
                <div className="appointment d-flex justify-content-center">
                    {reservations.length === 0 ? (
                        <p>No reservations available.</p>
                    ) : (
                        reservations.map((reservation) => (
                            <div key={reservation.id} className="apointment-table">
                                <ul>
                                    <li>Appointment Date: {reservation.date}</li>
                                    <li>Name: {reservation.name}</li>
                                    <li>Phone Number: {reservation.number}</li>
                                </ul>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(reservation.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default Dashboard;
