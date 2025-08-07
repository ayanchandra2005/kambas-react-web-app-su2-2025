import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import * as client from "./client";
import { setCurrentUser } from "./reducer";

export default function Signup() {
  const [user, setUser] = useState({ username: "", password: "", verify: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = async () => {
    if (user.password !== user.verify) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      navigate("/Kambaz/Account/Profile");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div id="wd-signup-screen" className="p-4">
      <h1>Signup</h1>
      <Form>
        <Form.Group controlId="signup-username" className="mb-2">
          <Form.Control
            type="text"
            placeholder="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="signup-password" className="mb-2">
          <Form.Control
            type="password"
            placeholder="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="signup-verify-password" className="mb-2">
          <Form.Control
            type="password"
            placeholder="verify password"
            value={user.verify}
            onChange={(e) => setUser({ ...user, verify: e.target.value })}
          />
        </Form.Group>

        <Button
          className="w-100 mb-2"
          variant="primary"
          id="wd-signup-btn"
          onClick={signup}
        >
          Sign-up
        </Button>

        <div className="text-center">
          <Link id="wd-signin-link" to="/Kambaz/Account/Signin">
            Sign-in
          </Link>
        </div>
      </Form>
    </div>
  );
}