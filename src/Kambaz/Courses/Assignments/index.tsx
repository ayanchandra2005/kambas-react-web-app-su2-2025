import { Button, FormControl, InputGroup, ListGroup } from "react-bootstrap";
import { FaSearch, FaPlus, FaCheckCircle, FaRegFileAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxDragHandleDots2 } from "react-icons/rx";

export default function Assignments() {
  return (
    <div id="wd-assignments" className="p-4">
      {/* Search and Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ maxWidth: "300px" }}>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <FormControl
            placeholder="Search for Assignments"
            id="wd-search-assignment"
          />
        </InputGroup>

        <div>
          <Button variant="light" className="me-2">
            <FaPlus className="me-1" />
            Group
          </Button>
          <Button variant="danger">
            <FaPlus className="me-1" />
            Assignment
          </Button>
        </div>
      </div>

      {/* Assignment Header */}
      <div className="d-flex justify-content-between align-items-center bg-light p-2 border">
        <div className="fw-bold d-flex align-items-center gap-2">
          <RxDragHandleDots2 />
          ASSIGNMENTS
        </div>
        <div className="d-flex align-items-center gap-2">
          <span>40% of Total</span>
          <FaPlus />
        </div>
      </div>

      {/* Assignment List */}
      <ListGroup variant="flush">
        {[1, 2, 3].map((num) => (
          <ListGroup.Item
            key={num}
            className="d-flex justify-content-between align-items-start px-3 py-2"
            style={{
              borderLeft: "4px solid green",
              borderTop: "1px solid #dee2e6",
              borderBottom: "1px solid #dee2e6",
              borderRight: "1px solid #dee2e6",
            }}
          >
            <div className="d-flex gap-3">
              <RxDragHandleDots2 className="mt-1" />
              <FaRegFileAlt className="text-success mt-1" />
              <div>
                <a
                  href={`#/Kambaz/Courses/1234/Assignments/${num * 111}`}
                  className="fw-bold text-decoration-none text-dark"
                >
                  A{num}
                </a>
                <div className="text-muted small">
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <b>Not available until</b>{" "}
                  {num === 1 ? "May 6" : num === 2 ? "May 13" : "May 20"} at
                  12:00am | <b>Due</b>{" "}
                  {num === 1 ? "May 13" : num === 2 ? "May 20" : "May 27"} at
                  11:59pm | 100 pts
                </div>
              </div>
            </div>
            <div className="d-flex align-items-start gap-2 pt-1">
              <FaCheckCircle color="green" />
              <BsThreeDotsVertical />
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
