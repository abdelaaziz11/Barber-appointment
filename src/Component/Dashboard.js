import React, { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";
import NavBar from "./Navbar";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRoleAndData = async () => {
      try {
        setLoading(true);
        const user = auth.currentUser;

        if (user) {
          // Fetch user role from Firestore
          const userDoc = await getDoc(doc(db, "Users", user.uid));
          const userData = userDoc.data();
          setRole(userData?.role || "user");

          // Fetch appointments based on user role
          const bookingsRef = collection(db, "bookings");
          if (userData?.role === "admin") {
            const snapshot = await getDocs(bookingsRef);
            const allBookings = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setAppointments(allBookings);
          } else {
            const q = query(bookingsRef, where("userId", "==", user.uid));
            const snapshot = await getDocs(q);
            const userBookings = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setAppointments(userBookings);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRoleAndData();
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
    <>
      <NavBar />
      <div className="container text-center mt-3">
        <h1>{role === "admin" ? "Admin Dashboard" : "User Dashboard"}</h1>
        <h2>Your Appointments</h2>
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <ul className="applist">
            {appointments.map((appointment) => (
              <li key={appointment.id}>
                {appointment.service} | {appointment.date} | {appointment.time}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Dashboard;
