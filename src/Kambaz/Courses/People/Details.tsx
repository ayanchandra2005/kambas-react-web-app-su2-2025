import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import { FaPencil } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import * as client from "../../Account/client";
import { FormControl } from "react-bootstrap";

export default function PeopleDetails() {
  const { uid } = useParams();
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    navigate(-1);
  };

  const fetchUser = async () => {
    if (!uid) return;
    const u = await client.findUserById(uid);
    setUser(u);
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  if (!uid) return null;

  // editing state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");         // NEW
  const [role, setRole] = useState("");           // NEW
  const [editing, setEditing] = useState(false);

  const beginEditing = () => {
    setName(`${user.firstName ?? ""} ${user.lastName ?? ""}`.trim());
    setEmail(user.email ?? "");                   // initialize from user
    setRole(user.role ?? "USER");                 // initialize from user
    setEditing(true);
  };

  const saveUser = async () => {
    const [firstName = "", lastName = ""] = name.trim().split(" ", 2);
    const updatedUser = { ...user, firstName, lastName, email, role };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    navigate(-1);
  };

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button
        onClick={() => navigate(-1)}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </button>

      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />

      {/* Name row with edit/save icons */}
      <div className="text-danger fs-4">
        {!editing && (
          <FaPencil
            onClick={beginEditing}
            className="float-end fs-5 mt-2 wd-edit"
            role="button"
          />
        )}
        {editing && (
          <FaCheck
            onClick={saveUser}
            className="float-end fs-5 mt-2 me-2 wd-save"
            role="button"
          />
        )}

        {!editing && (
          <div className="wd-name" onClick={beginEditing} role="button">
            {user.firstName} {user.lastName}
          </div>
        )}

        {editing && (
          <FormControl
            className="w-75 wd-edit-name"
            defaultValue={`${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveUser();
            }}
            autoFocus
          />
        )}
      </div>

      {/* Role */}
      <div className="mt-3">
        <b>Role:</b>{" "}
        {!editing ? (
          <span className="wd-roles">{user.role}</span>
        ) : (
          <select
            className="form-select w-75"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="USER">User</option>
            <option value="STUDENT">Student</option>
            <option value="TA">Assistant</option>
            <option value="FACULTY">Faculty</option>
            <option value="ADMIN">Admin</option>
          </select>
        )}
      </div>

      {/* Email */}
      <div className="mt-3">
        <b>Email:</b>{" "}
        {!editing ? (
          <span className="wd-email">{user.email}</span>
        ) : (
          <FormControl
            className="w-75"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
      </div>

      {/* Other read-only fields */}
      <div className="mt-3">
        <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span>
        <br />
        <b>Section:</b> <span className="wd-section">{user.section}</span>
        <br />
        <b>Total Activity:</b>{" "}
        <span className="wd-total-activity">{user.totalActivity}</span>
      </div>

      <hr />
      <button
        onClick={() => deleteUser(uid)}
        className="btn btn-danger float-end wd-delete"
      >
        Delete
      </button>
      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary float-start float-end me-2 wd-cancel"
      >
        Cancel
      </button>
    </div>
  );
}