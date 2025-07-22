import { Form, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import * as db from "../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find(
    (a) => a._id === aid && a.course === cid
  );

  return (
    <div id="wd-assignments-editor" className="p-4">
      <Form>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue={assignment?.title || ""} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            defaultValue="The assignment is available online. Submit a link to the landing page of your Web application running on Netlify."
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="wd-points">
              <Form.Label>Points</Form.Label>
              <Form.Control type="number" defaultValue={100} />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="wd-group">
              <Form.Label>Assignment Group</Form.Label>
              <Form.Select>
                <option>ASSIGNMENTS</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="wd-display-grade-as">
              <Form.Label>Display Grade as</Form.Label>
              <Form.Select>
                <option>Percentage</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="wd-submission-type">
          <Form.Label>Submission Type</Form.Label>
          <Form.Select className="mb-2">
            <option>Online</option>
          </Form.Select>

          <div className="border p-3 rounded">
            <div className="fw-bold mb-2">Online Entry Options</div>
            <Form.Check type="checkbox" label="Text Entry" id="wd-text-entry" />
            <Form.Check
              type="checkbox"
              label="Website URL"
              id="wd-website-url"
              defaultChecked
            />
            <Form.Check
              type="checkbox"
              label="Media Recordings"
              id="wd-media-recordings"
            />
            <Form.Check
              type="checkbox"
              label="Student Annotation"
              id="wd-student-annotation"
            />
            <Form.Check
              type="checkbox"
              label="File Uploads"
              id="wd-file-upload"
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-assign-to">
          <Form.Label>Assign to</Form.Label>
          <Form.Control type="text" defaultValue="Everyone" />
        </Form.Group>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="wd-due-date">
              <Form.Label>Due</Form.Label>
              <Form.Control
                type="datetime-local"
                defaultValue="2025-07-07T23:59"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="wd-available-from">
              <Form.Label>Available from</Form.Label>
              <Form.Control
                type="datetime-local"
                defaultValue="2025-07-07T00:00"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="wd-available-until">
              <Form.Label>Until</Form.Label>
              <Form.Control
                type="datetime-local"
                defaultValue="2025-07-10T23:59"
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-2">
          <Link
            to={`/Kambaz/Courses/${cid}/Assignments`}
            className="btn btn-secondary"
          >
            Cancel
          </Link>
          <Link
            to={`/Kambaz/Courses/${cid}/Assignments`}
            className="btn btn-danger"
          >
            Save
          </Link>
        </div>
      </Form>
    </div>
  );
}
