// adminUsers.js
import styles from "../styles/adminUsers.module.css";

import React, { useState, useEffect } from "react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [message, setMessage] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  // Function to fetch users from the server
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/manageUsers");
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        console.error("Error fetching users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Function to create a new user
  const createUser = async () => {
    try {
      const response = await fetch("/api/admin/manageUsers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setNewUser({ username: "", password: "", role: "" });
        fetchUsers(); // Refresh the user list after creating a new user
      } else {
        console.error("Error creating user");
        setMessage("Error creating user.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setMessage("Error creating user.");
    }
  };

  // Function to update a user
  const updateUser = async () => {
    try {
      const response = await fetch("/api/admin/manageUsers", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedUserId, ...newUser }),
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setNewUser({ username: "", password: "", role: "" });
        fetchUsers(); // Refresh the user list after updating a user
      } else {
        console.error("Error updating user");
        setMessage("Error updating user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage("Error updating user.");
    }
  };

  // Function to delete a user
  const deleteUser = async () => {
    try {
      const response = await fetch("/api/admin/manageUsers", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedUserId }),
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        fetchUsers(); // Refresh the user list after deleting a user
      } else {
        console.error("Error deleting user");
        setMessage("Error deleting user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage("Error deleting user.");
    }
  };

  useEffect(() => {
    // Fetch users when the component mounts
    fetchUsers();
  }, []);

  return (
    <div className={styles.userContainer}>
      <div>
        <h3 className={styles.userHeader}>User List</h3>
        <ul className={styles.userList}>
          {users.map((user) => (
            <li key={user.id} className={styles.userItem}>
              ID: {user.id}, Username: {user.username}, Role: {user.role}
              <button
                onClick={() => deleteUser(user.id)}
                className={`${styles.deleteButton} ${styles.addButton}`}
              >
                Delete User
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.formSection}>
        <h3>Create User</h3>

        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className={styles.input}
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className={styles.select}
        >
          <option value="">Select Role</option>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>
        <button onClick={createUser} className={styles.addButton}>
          Create User
        </button>

        <h3>Update User</h3>
        <select
          onChange={(e) => setSelectedUserId(e.target.value)}
          className={styles.select}
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="New Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className={styles.input}
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className={styles.select}
        >
          <option value="">Select New Role</option>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>
        <button onClick={updateUser} className={styles.updateButton}>
          Update User
        </button>
      </div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default ManageUsers;
