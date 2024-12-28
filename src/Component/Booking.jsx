import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "./Navbar";

const Booking = () => {
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings when component mounts
  useEffect(() => {
    const fetchBookings = async () => {
      const user = auth.currentUser;
      if (user) {
        const bookingsRef = collection(db, "bookings");
        const q = query(bookingsRef, where("userId", "==", user.uid));
        const snapshot = await getDocs(q);
        const bookings = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUserBookings(bookings);
      }
      setLoading(false);
    };

    fetchBookings();
  }, []);

  // Handle form submission to book a service
  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!service || !date || !time) {
      toast.error("Please fill in all fields!");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      toast.error("You need to log in first.");
      return;
    }

    try {
      const newBooking = {
        userId: user.uid,
        service,
        date,
        time,
        status: "pending",
      };

      await addDoc(collection(db, "bookings"), newBooking);
      toast.success("Booking successful!");

      // Update the list of user bookings
      setUserBookings([...userBookings, newBooking]);
      setService("");
      setDate("");
      setTime("");
    } catch (error) {
      console.error("Error adding booking: ", error);
      toast.error("Failed to book. Please try again.");
    }
  };


  return (
    <>
    <NavBar/>
    <div className="container">
      <h1>Book a Service</h1>
      <form onSubmit={handleBookingSubmit}>
        <div className="form-group">
          <label htmlFor="service">Select Service</label>
          <input
            type="text"
            id="service"
            className="form-control"
            value={service}
            onChange={(e) => setService(e.target.value)}
            placeholder="Enter service name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Select Date</label>
          <input
            type="date"
            id="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Select Time</label>
          <input
            type="time"
            id="time"
            className="form-control"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Book Service</button>
      </form>

      <h2>Your Bookings</h2>
      {userBookings.length === 0 ? (
        <p>No bookings yet. Please book a service.</p>
      ) : (
        <ul className="mt-3">
          {userBookings.map((booking) => (
            <li key={booking.id}>
              {booking.service} on {booking.date} at {booking.time} -{" "}
              <span className={booking.status === "pending" ? "text-warning" : "text-success"}>
                {booking.status}
              </span>
            </li>
          ))}
        </ul>
      )}

      <ToastContainer />
    </div>
    </>
  );
};

export default Booking;
