import { useState, useEffect } from "react";
import { useParams, Outlet } from "react-router";
import PeopleTable from "../Courses/People/Table";
import * as client from "./client";
import { FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const { uid } = useParams();

  const fetchUsers = async () => {
    try {
      const all = await client.findAllUsers();
      setUsers(all);
    } catch (e) {
      console.error("Failed to fetch users", e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [uid]);

  const createUser = async () => {
    try {
      const user = await client.createUser({
        firstName: "New",
        lastName: `User${users.length + 1}`,
        username: `newuser${Date.now()}`,
        password: "password123",
        email: `email${users.length + 1}@neu.edu`,
        section: "S101",
        role: "STUDENT",
      });
      setUsers((prev) => [...prev, user]);
    } catch (e) {
      console.error("Failed to create user", e);
    }
  };

  const filterUsersByName = async (value: string) => {
    setName(value);
    try {
      if (value) {
        const filtered = await client.findUsersByPartialName(value);
        setUsers(filtered);
      } else {
        fetchUsers();
      }
    } catch (e) {
      console.error("Failed filtering by name", e);
    }
  };

  const filterUsersByRole = async (value: string) => {
    setRole(value);
    try {
      if (value) {
        const filtered = await client.findUsersByRole(value);
        setUsers(filtered);
      } else {
        fetchUsers();
      }
    } catch (e) {
      console.error("Failed filtering by role", e);
    }
  };

  return (
    <div>
      <button onClick={createUser} className="float-end btn btn-danger wd-add-people">
        <FaPlus className="me-2" />
        Users
      </button>

      <h3>Users</h3>

      <FormControl
        onChange={(e) => filterUsersByName(e.target.value)}
        placeholder="Search people"
        className="float-start w-25 me-2 wd-filter-by-name"
        value={name}
      />

      <select
        value={role}
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role"
      >
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>

      <div className="clearfix mb-3" />

      <PeopleTable users={users} />
      <Outlet />
    </div>
  );
}