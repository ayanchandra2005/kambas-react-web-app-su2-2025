import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
// import * as db from "../Database";
import * as client from "./client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signin = async () => {
    const user = await client.signin(credentials);
    // db.users.find(
    //   (u: any) =>
    //     u.username === credentials.username &&
    //     u.password === credentials.password
    // );
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

        {/* --- Team / Project Info link --- */}
        <div className="p-3 border rounded bg-light">
          <div className="fw-semibold mb-1">Project: Quizzes</div>
          <div className="small text-muted">
            Members: Ayan Chandra & Hudson Kass
          </div>
          <div className="small text-muted">
            Front-end Repository:
            github.com/ayanchandra2005/kambas-react-web-app-su2-2025
          </div>
          <div className="small text-muted">
            Back-end Repository:
            github.com/ayanchandra2005/kambaz-node-server-app
          </div>
        </div>
      </Form>
    </div>
  );
}
