import React, { useRef } from 'react';
import NavBar from './Navbar';

function Book() {
    const fname = useRef()
    const lname = useRef()
    const number = useRef()
    const date = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submited successfully !!")
        console.log({
            fname: fname.current.value,
            lname: lname.current.value,
            number: number.current.value,
            date: date.current.value,
        });
    }

    return (
        <>
            <NavBar />
            <div className="container text-center mt-5">
                <h1>Book an Oppointment</h1>
                <form className="booking-form mt-3">
                    <div className="form-group">
                        <div className="fullname">
                            <label htmlFor="fname">First Name</label>
                            <input type="text" className="form-control"
                                id="fname" name="fname" ref={fname}/>
                                <br />
                            <label htmlFor="lname">Last Name</label>
                            <input type="text" className="form-control"
                                id="lname" name="lname" ref={lname}/>
                        </div>
                        <br />
                        <div className="form-number">
                            <label htmlFor="date">Phone Number</label>
                            <input
                                type="mobile"
                                className="form-control"
                                name="date"
                                id="date"
                                ref={number}
                                required
                            />
                        </div>
                        <br />
                        <div className="form-date">
                            <label htmlFor="date">Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="date"
                                id="date"
                                ref={date}
                                required
                            />
                        </div>
                        <button className="btn bg-primary mt-4 text-white" 
                        type="submit"
                        onClick={handleSubmit}
                        >Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Book;