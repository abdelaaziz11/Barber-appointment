import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from './firebase';
import NavBar from './Navbar';

function Book() {
    const [name, setName] = useState(""); // Initialize with an empty string
    const [number, setNumber] = useState(""); // Initialize with an empty string
    const [date, setDate] = useState(""); // Initialize with an empty string

    const handleBooking = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'reservations'), {
                name,
                number,
                date,
            });
            alert('Réservation réussie !');
        } catch (error) {
            console.error('Erreur de réservation :', error);
            alert('Erreur lors de la réservation');
        }
    };

    return (
        <>
            <NavBar />
            <div className="container bookpage text-center mt-5">
                <h1>Book an Appointment</h1>
                <form className="booking-form mt-3" onSubmit={handleBooking}>
                    <div className="form-group">
                        <div className="name">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </div>
                        <div className="form-number">
                            <label htmlFor="number">Phone Number</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="number"
                                name="number"
                                onChange={(e) => setNumber(e.target.value)}
                                value={number}
                                required
                            />
                        </div>
                        <div className="form-date">
                            <label htmlFor="date">Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="date"
                                name="date"
                                onChange={(e) => setDate(e.target.value)}
                                value={date}
                                required
                            />
                        </div>
                        <button className="btn bg-primary mt-4 text-white" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Book;
