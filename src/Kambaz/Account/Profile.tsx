import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="p-4" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3">Profile</h3>

      <Form>
        <Form.Group controlId="profile-username" className="mb-2">
          <Form.Control type="text" placeholder="alice" />
        </Form.Group>

        <Form.Group controlId="profile-password" className="mb-2">
          <Form.Control type="password" placeholder="123" />
        </Form.Group>

        <Form.Group controlId="profile-firstname" className="mb-2">
          <Form.Control type="text" placeholder="Alice" />
        </Form.Group>

        <Form.Group controlId="profile-lastname" className="mb-2">
          <Form.Control type="text" placeholder="Wonderland" />
        </Form.Group>

        <Form.Group controlId="profile-dob" className="mb-2">
          <Form.Control type="date" />
        </Form.Group>

        <Form.Group controlId="profile-email" className="mb-2">
          <Form.Control type="email" placeholder="alice@wonderland.com" />
        </Form.Group>

        <Form.Group controlId="profile-role" className="mb-3">
          <Form.Select>
            <option>User</option>
            <option>Admin</option>
            <option>Faculty</option>
            <option>Student</option>
          </Form.Select>
        </Form.Group>

        <Link to="/Kambaz/Account/Signin">
          <Button variant="danger" className="w-100">
            Signout
          </Button>
        </Link>
      </Form>
    </div>
  );
}