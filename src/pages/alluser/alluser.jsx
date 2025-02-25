import React, { useEffect, useState } from "react";
import moment from "moment";
import "./alluser.css";
import Change from "../changeUser/Change.jsx";
import axios from "axios";
import { toast } from "react-toastify";

export default function AllUser() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  // Fetch all users
  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_FRONTEND_URL}/getAllUser`);
      // const { data } = await  axios.get(`${process.env.REACT_APP_API_URL}/getAllUser`);
console.log("users",data)
console.log("API URL:", process.env.FRONTEND_URL);

      if (data.success) {
        setUsers(data.data);
      } else {
        toast.error("Failed to fetch users.");
      }
    } catch (error) {
      toast.error("Error fetching users.");
      console.error(error);
    }
  };

  // Delete a user
  const handleDeleteUser = async (id) => {
    try {
      const { data } = await axios.post("http://localhost:5801/deleteUser", {
        userId: id,
      });
      if (data.success) {
        fetchAllUsers();
        toast.success("User deleted successfully");
      } else {
        toast.error("Failed to delete user.");
      }
    } catch (error) {
      toast.error("Error deleting user.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      <table className="user-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{moment(user.createdAt).format("YYYY-MM-DD")}</td>
              <td className="user-actions">
                <span
                  className="edit-icon"
                  onClick={() => {
                    setIsModalOpen(true);
                    setSelectedUser(user);
                  }}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </span>
                <span
                  className="delete-icon"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  x
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render Change component when editing */}
      {isModalOpen && (
        <Change
          getUser={fetchAllUsers}
          idUser={selectedUser._id}
          nameUser={selectedUser.username}
          emailUser={selectedUser.email}
          roleUser={selectedUser.role}
          close={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
