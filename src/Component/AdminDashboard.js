import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Bookings
  const fetchBookings = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Bookings"));
      const bookingsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(bookingsData);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Error fetching bookings.");
    }
  };

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Users"));
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchBookings();
      await fetchUsers();
      setLoading(false);
    };
    fetchData();
  }, []);

  // Promote User to Admin
  const handlePromoteToAdmin = async (userId) => {
    try {
      await updateDoc(doc(db, "Users", userId), { role: "admin" });
      toast.success("User promoted to admin!");
      await fetchUsers(); // Refresh the users list
    } catch (error) {
      console.error("Error promoting user to admin:", error);
      toast.error("Error promoting user to admin.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-dashboard container">
      <ToastContainer />

      <h1>Admin Dashboard</h1>

      {/* Section to View Bookings */}
      <section>
        <h2>Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Service</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.clientName}</td>
                  <td>{booking.service}</td>
                  <td>{booking.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Section to Manage Users */}
      <section>
        <h2>Users</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handlePromoteToAdmin(user.id)}
                        className="btn btn-primary"
                      >
                        Promote to Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
