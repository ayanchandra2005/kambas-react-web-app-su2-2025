import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="p-4">
      <h1>Sign in</h1>
      <Form>
        <Form.Group controlId="wd-username" className="mb-2">
          <Form.Control type="text" placeholder="username" />
        </Form.Group>

        <Form.Group controlId="wd-password" className="mb-2">
          <Form.Control type="password" placeholder="password" />
        </Form.Group>

        <Link
          to="/Kambaz/Account/Profile"
          id="wd-signin-btn"
          className="btn btn-primary w-100 mb-2"
        >
          Sign-in
        </Link>

        <div className="text-center">
          <Link id="wd-signup-link" to="/Kambaz/Account/Signup">
            Sign-up
          </Link>
        </div>
      </Form>
    </div>
  );
}