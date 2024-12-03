import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

const UserManagement = () => {
  const { user, logout } = useContext(AuthContext); // Access full user object from context
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    if (user) {
      console.log('Logged in user:', user); // Check if the user data is loaded correctly
    }
    fetchStaff();
  }, [user]);

  const fetchStaff = async () => {
    // Simulate fetching staff data (replace with actual API call)
    setStaff([
      { id: 1, username: 'staff1', role: 'Manager' },
      { id: 2, username: 'staff2', role: 'Waiter' },
      // Add more staff members as needed
    ]);
  };

  return (
    <div className="form-container">
      <h2>Wings Cafe - Staff Management</h2>
      {user ? (
        <>
          <h3>Logged in as: {user.username}</h3>
          <button onClick={logout}>Logout</button> {/* Logout button */}
        </>
      ) : (
        <h3>Not logged in</h3>
      )}

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.length > 0 ? (
            staff.map((staffMember) => (
              <tr key={staffMember.id}>
                <td>{staffMember.username}</td>
                <td>{staffMember.role}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No staff members found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
