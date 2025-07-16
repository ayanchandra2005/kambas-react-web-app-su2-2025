import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="p-4">
      <h1>Signup</h1>
      <Form>
        <Form.Group controlId="signup-username" className="mb-2">
          <Form.Control type="text" placeholder="username" />
        </Form.Group>

        <Form.Group controlId="signup-password" className="mb-2">
          <Form.Control type="password" placeholder="password" />
        </Form.Group>

        <Form.Group controlId="signup-verify-password" className="mb-2">
          <Form.Control type="password" placeholder="verify password" />
        </Form.Group>

        <Link to="/Kambaz/Account/Profile">
          <Button className="w-100 mb-2" variant="primary" id="wd-signup-btn">
            Sign-up
          </Button>
        </Link>

        <div className="text-center">
          <Link id="wd-signin-link" to="/Kambaz/Account/Signin">
            Sign-in
          </Link>
        </div>
      </Form>
    </div>
  );
}