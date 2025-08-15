import { Form, Row, Col, Button } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getAssignmentDetails,
  addNewAssignment,
  editAssignment,
} from "./clients";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(100);
  const [due, setDue] = useState("2025-07-07T23:59");
  const [availableFrom, setAvailableFrom] = useState("2025-07-07T00:00");
  const [availableUntil, setAvailableUntil] = useState("2025-07-10T23:59");

  useEffect(() => {
    const fetchAssignment = async () => {
      if (!aid) return;
      try {
        const assignment = await getAssignmentDetails(aid);
        setTitle(assignment.title ?? "");
        setDescription(assignment.description ?? "");
        setPoints(assignment.points ?? 100);
        setDue(assignment.due ?? "2025-07-07T23:59");
        setAvailableFrom(assignment.availableFrom ?? "2025-07-07T00:00");
        setAvailableUntil(assignment.availableUntil ?? "2025-07-10T23:59");
      } catch (err: any) {
        console.error("Failed to fetch assignment:", err?.response?.data || err.message);
      }
    };
    fetchAssignment();
  }, [aid]);

  const handleSave = async () => {
    if (!cid) {
      console.error("Course ID is undefined");
      return;
    }

    const assignmentData = {
      course: cid,
      title,
      description,
      points,
      due,
      availableFrom,
      availableUntil,
    };

    try {
      if (aid) {
        await editAssignment({ _id: aid, ...assignmentData });
      } else {
        await addNewAssignment(cid, assignmentData);
      }
      navigate(`/Kambaz/Courses/${cid}/Assignments`);
    } catch (err: any) {
      console.error("Failed to save assignment:", err?.response?.data || err.message);
    }
  };

  return (
    <div id="wd-assignments-editor" className="p-4">
      <Form>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="wd-points">
              <Form.Label>Points</Form.Label>
              <Form.Control
                type="number"
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="wd-group">
              <Form.Label>Assignment Group</Form.Label>
              <Form.Select defaultValue="ASSIGNMENTS">
                <option>ASSIGNMENTS</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="wd-display-grade-as">
              <Form.Label>Display Grade as</Form.Label>
              <Form.Select defaultValue="Percentage">
                <option>Percentage</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="wd-submission-type">
          <Form.Label>Submission Type</Form.Label>
          <Form.Select className="mb-2" defaultValue="Online">
            <option>Online</option>
          </Form.Select>

          <div className="border p-3 rounded">
            <div className="fw-bold mb-2">Online Entry Options</div>
            <Form.Check type="checkbox" label="Text Entry" id="wd-text-entry" />
            <Form.Check type="checkbox" label="Website URL" id="wd-website-url" defaultChecked />
            <Form.Check type="checkbox" label="Media Recordings" id="wd-media-recordings" />
            <Form.Check type="checkbox" label="Student Annotation" id="wd-student-annotation" />
            <Form.Check type="checkbox" label="File Uploads" id="wd-file-upload" />
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
                value={due}
                onChange={(e) => setDue(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="wd-available-from">
              <Form.Label>Available from</Form.Label>
              <Form.Control
                type="datetime-local"
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="wd-available-until">
              <Form.Label>Until</Form.Label>
              <Form.Control
                type="datetime-local"
                value={availableUntil}
                onChange={(e) => setAvailableUntil(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-2">
          <Link to={`/Kambaz/Courses/${cid}/Assignments`} className="btn btn-secondary">
            Cancel
          </Link>
          <Button className="btn btn-danger" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}