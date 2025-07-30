import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as db from "../Database";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signin = () => {
    const user = db.users.find(
      (u: any) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );
    if (!user) return;
    dispatch(setCurrentUser(user));
    navigate("/Kambaz/Dashboard");
  };

  return (
    <div id="wd-signin-screen" className="p-4">
      <h1>Sign in</h1>
      <Form>
        <Form.Control
          value={credentials.username || ""}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          className="mb-2"
          placeholder="username"
          id="wd-username"
        />
        <Form.Control
          value={credentials.password || ""}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          className="mb-2"
          placeholder="password"
          id="wd-password"
          type="password"
        />
        <Button onClick={signin} id="wd-signin-btn" className="w-100 mb-2">
          Sign in
        </Button>
        <div className="text-center">
          <Link id="wd-signup-link" to="/Kambaz/Account/Signup">
            Sign-up
          </Link>
        </div>
      </Form>
    </div>
  );
}
