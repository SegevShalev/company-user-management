import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  createUser,
  deleteUserByEmail,
  deleteUserById,
  getAllUsers,
} from "../axiosUtil/api";
import "./main.scss";
import UserCard from "./UserCard";

export default function UserManager(props) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [emailToDelete, setEmailToDelete] = useState("");
  const [users, setUsers] = useState([]);
  const page = useRef(0);

  useEffect(() => {
    const getUsers = async () => {
      await handleGetAllUsers();
    };
    getUsers();
  }, [page]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createUser(formData, props.companyId);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteByEmail = async (e, email) => {
    if (email.trim().length === 0) return;
    e.preventDefault();
    const deleteUserIndex = users.findIndex((user) => user.email === email);
    if (deleteUserIndex === -1) return;
    const userToDelete = users[deleteUserIndex];
    const newUserList = [...users];
    newUserList.splice(deleteUserIndex, 1);
    setUsers(newUserList);
    try {
      setLoading(true);
      const res = await deleteUserByEmail(email);
      if (res) {
        setEmailToDelete("");
      }
    } catch (err) {
      const restoredUsers = [...newUserList];
      restoredUsers.splice(deleteUserIndex, 0, userToDelete);
      setUsers(restoredUsers);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteById = useCallback(
    async (e, id = null) => {
      e.preventDefault();
      const deleteUserIndex = users.findIndex((user) => user._id === id);
      const userToDelete = users[deleteUserIndex];
      const newUserList = [...users];
      newUserList.splice(deleteUserIndex, 1);
      setUsers(newUserList);
      try {
        setLoading(true);
        await deleteUserById(id);
      } catch (err) {
        const restoredUsers = [...newUserList];
        restoredUsers.splice(deleteUserIndex, 0, userToDelete);
        setUsers(restoredUsers);
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [users]
  );

  const updatePage = (direction) => {
    if (direction === "prev" && page.current > 0) {
      page.current--;
    } else if (direction === "next") {
      page.current++;
    }
  };

  const handleGetAllUsers = async () => {
    try {
      setLoading(true);
      const users = await getAllUsers(page.current, props.companyId);
      setUsers(users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  console.log("loading");
  return (
    <>
      <div className="main-container" style={{ padding: "2rem" }}>
        <div className="user-container">
          <h2>Create a New User</h2>
          <form>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <br />
            <br />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <br />
            <br />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <br />
            <br />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <br />
            <br />

            <button type="submit" onClick={handleSubmit} disabled={loading}>
              Create User
            </button>
          </form>
        </div>
        <div className="user-container">
          <h2>Delete User </h2>
          <form>
            <input
              type="email"
              placeholder="User Email"
              value={emailToDelete}
              onChange={(e) => setEmailToDelete(e.target.value)}
              required
            />
            <br />
            <br />
            <button
              type="submit"
              disabled={loading}
              onClick={(e) => handleDeleteByEmail(e, emailToDelete)}
            >
              Delete User
            </button>
          </form>
        </div>

        <div className="user-container">
          <button onClick={() => handleGetAllUsers()}>Refresh Users</button>
          {!!users.length && (
            <>
              {users.map((user) => (
                <UserCard
                  key={user._id}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  email={user.email}
                  id={user._id}
                  loading={loading}
                  deleteUserById={handleDeleteById}
                />
              ))}
            </>
          )}
          <div className="page-container">
            <div className="btn-container">
              <button
                onClick={() => updatePage("prev")}
                disabled={page.current >= 0}
              >
                Get Previous Users
              </button>
              <button
                onClick={() => updatePage("next")}
                disabled={users.length < 10}
              >
                Get Next Users
              </button>
            </div>
            <div>Page:{page.current + 1}</div>
          </div>
        </div>
      </div>

      {!!loading && (
        <div className="loading">
          loading<span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      )}
    </>
  );
}
