
// import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import NavBar from './Navbar';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';
import './Booking.css';


function Booking({ auth }) {
  const [user, setUser] = useState(null);
  const [date, setDate] = useState(new Date());
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, [auth]);

  async function createCalnderBook(e) {
    e.preventDefault();
    console.log("Creating calendar event");
  
    if (!auth.currentUser) {
      alert("You must be logged in to create an appointment.");
      return;
    }
  
    const token = await auth.currentUser.getIdToken(true);
  
    const event = {
      summary: service,
      description: description,
      date: {
        dateTime: date.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };
  
    try {
      // Create Google Calendar Event
      await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Event created:", data);
          alert("Created, check your Google Calendar and Appointment!");
        })
        .catch((error) => console.error("Error creating event:", error));
  
      // Save reservation in Firestore
      await addDoc(collection(db, 'reservations'), {
        date,
        service,
        description,
        userId: auth.currentUser.uid, // Include the user's UID
      });
  
      alert('Reservation created successfully!');
    } catch (error) {
      console.error("Error creating reservation:", error);
      alert("Error creating the reservation.");
    }
  }
  

  return (
    <>
    <NavBar/>
    <div className="Booking">
      <div style={{ width: "400px", margin: "30px auto" }}>
        {user ? (
          <>
            <h2 className="text-center">Book an Appointment</h2>
            <form className="form-booking mt-2 text-center">
            <p>Date of your appointment</p>
            <DateTimePicker onChange={setDate} value={date} />
            <p className="mt-3">Service</p>
            <input type="text" onChange={(e) => setService(e.target.value)} />
            <p>Description</p>
            <input type="text" onChange={(e) => setDescription(e.target.value)} />
           
            <button onClick={createCalnderBook}>Create your appointment</button>
            <p></p>
            </form>
            {/* <button onClick={handleSignOut}>Sign Out</button> */}
          </>
        ) : (
          <>
          no appointment yet
          </>
        )}
      </div>
    </div>
    </>
  );
}

export default Booking;
