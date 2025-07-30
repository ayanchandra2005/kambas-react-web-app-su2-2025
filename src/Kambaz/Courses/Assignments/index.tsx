import { useParams, Link } from "react-router-dom";
import { Button, FormControl, InputGroup, ListGroup } from "react-bootstrap";
import { FaSearch, FaPlus, FaCheckCircle, FaRegFileAlt, FaTrash } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";

function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleString("en-US", options).replace(",", " at");
}

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();

  const assignments = useSelector((state: any) =>
    state.assignmentsReducer.assignments.filter((a: any) => a.course === cid)
  );

  const handleDelete = (aid: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this assignment?");
    if (confirmDelete) {
      dispatch(deleteAssignment(aid));
    }
  };

  return (
    <div id="wd-assignments" className="p-4">
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
          <Link
            to={`/Kambaz/Courses/${cid}/Assignments/Editor`}
            className="btn btn-danger"
          >
            <FaPlus className="me-1" />
            Assignment
          </Link>
        </div>
      </div>

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

      <ListGroup variant="flush">
        {assignments.map((a: any) => (
          <ListGroup.Item
            key={a._id}
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
                  href={`#/Kambaz/Courses/${cid}/Assignments/${a._id}`}
                  className="fw-bold text-decoration-none text-dark"
                >
                  {a.title}
                </a>
                <div className="text-muted small">
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <b>Not available until</b>{" "}
                  {a.availableFrom ? formatDateTime(a.availableFrom) : "TBD"} |{" "}
                  <b>Due</b> {a.due ? formatDateTime(a.due) : "TBD"} |{" "}
                  {a.points || 100} pts
                </div>
              </div>
            </div>
            <div className="d-flex align-items-start gap-2 pt-1">
              <FaCheckCircle color="green" />
              <FaTrash
                className="text-danger"
                style={{ cursor: "pointer" }}
                onClick={() => handleDelete(a._id)}
              />
              <BsThreeDotsVertical />
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}