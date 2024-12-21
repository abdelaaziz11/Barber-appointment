import { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "./firebase";
import NavBar from "./Navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";


function Dashboard() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(true);

    // check the user is true or false
    useEffect(() => {
        console.log("Current user:", user);
    }, [user]);

    useEffect(() => {
        // Listen for authentication state changes
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Set the user when authenticated
            setLoading(false); // Stop loading once user is set
        });

        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchReservations = async () => {
            if (!user) {
                console.log("User is not defined yet. Skipping Firestore query.");
                return;
            }

            try {
                const reservationsRef = collection(db, "reservations");
                const q = query(reservationsRef, where("userId", "==", user.uid));
                const querySnapshot = await getDocs(q);

                const fetchedReservations = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id, // Include document ID for potential delete operations
                        ...data,
                        // Convert Firestore Timestamps to readable formats
                        date: data.date?.toDate().toLocaleString() || "N/A",
                    };
                });
                setReservations(fetchedReservations);
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        };

        fetchReservations();
    }, [user]);

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
                <h3 className="mt-5 mb-3">Your Appointment</h3>
                <div className="appointment d-flex justify-content-center">
                    {reservations.length === 0 ? (
                        <p>No reservations available.</p>
                    ) : (
                        reservations.map((reservation) => (
                            <div key={reservation.id} className="apointment-table">
                                <ul>
                                    <li>Date: {reservation.date}</li>
                                    <li>Service: {reservation.service}</li>
                                    <li>Description: {reservation.description}</li>
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
