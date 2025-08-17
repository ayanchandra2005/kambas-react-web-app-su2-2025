// src/Kambaz/Courses/Quizzes/index.tsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, FormControl, InputGroup, ListGroup, Dropdown } from "react-bootstrap";
import {
  FaSearch,
  FaPlus,
  FaCheckCircle,
  FaRegFileAlt,
  FaBan,
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import {
  getQuizzesByCourse,
  addNewQuiz,
  removeQuiz,
  publishQuiz,
  unpublishQuiz,
} from "./client";

function formatDateTime(dateString?: string) {
  if (!dateString) return "TBD";
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

function availabilityLabel(q: any) {
  const now = new Date();
  const from = q.availableFrom ? new Date(q.availableFrom) : undefined;
  const until = q.availableUntil ? new Date(q.availableUntil) : undefined;

  if (from && now < from) return `Not available until ${formatDateTime(q.availableFrom)}`;
  if (until && now > until) return "Closed";
  return "Available";
}

export default function Quizzes() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const fetchQuizzes = async () => {
    if (!cid) return;
    try {
      const data = await getQuizzesByCourse(cid);
      setQuizzes(data || []);
    } catch (err) {
      console.error("Failed to fetch quizzes", err);
      setQuizzes([]);
    }
  };

  const handleDelete = async (qid: string) => {
    const ok = window.confirm("Delete this quiz?");
    if (!ok) return;
    try {
      await removeQuiz(qid);
      setQuizzes((prev) => prev.filter((q) => q._id !== qid));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleAdd = async () => {
    if (!cid) return;
    try {
      const created = await addNewQuiz(cid, {
        title: "New Quiz",
        description: "",
        published: false, // 🚫 default: unpublished (requirement)
        points: 0,
        due: null,
        availableFrom: null,
        availableUntil: null,
      });
      navigate(`/Kambaz/Courses/${cid}/Quizzes/${created._id}`);
    } catch (err) {
      console.error("Create quiz failed", err);
    }
  };

  const togglePublish = async (quiz: any) => {
    try {
      if (quiz.published) {
        await unpublishQuiz(quiz._id);
      } else {
        await publishQuiz(quiz._id);
      }
      setQuizzes((prev) =>
        prev.map((q) => (q._id === quiz._id ? { ...q, published: !q.published } : q))
      );
    } catch (err) {
      console.error("Publish toggle failed", err);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  const filtered = quizzes.filter((q) =>
    q.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div id="wd-quizzes" className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ maxWidth: "300px" }}>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <FormControl
            placeholder="Search for Quiz"
            id="wd-search-quiz"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>

        <div>
          <Button onClick={handleAdd} className="btn btn-danger" id="wd-add-quiz-btn">
            <FaPlus className="me-1" />
            Quiz
          </Button>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center bg-light p-2 border">
        <div className="fw-bold d-flex align-items-center gap-2">
          <RxDragHandleDots2 />
          QUIZZES
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-muted p-3">
          No quizzes yet. Click <b>+ Quiz</b> to add your first quiz.
        </div>
      ) : (
        <ListGroup variant="flush">
          {filtered.map((q: any) => {
            const isPublished = !!q.published;
            const numQs = q.numQuestions ?? q.questions?.length ?? 0;

            return (
              <ListGroup.Item
                key={q._id}
                className="d-flex justify-content-between align-items-start px-3 py-2"
                style={{
                  borderLeft: `4px solid ${isPublished ? "green" : "#dc3545"}`,
                  borderTop: "1px solid #dee2e6",
                  borderBottom: "1px solid #dee2e6",
                  borderRight: "1px solid #dee2e6",
                }}
              >
                <div className="d-flex gap-3">
                  <RxDragHandleDots2 className="mt-1" />
                  <FaRegFileAlt className="text-success mt-1" />
                  <div>
                    <Link
                      to={`/Kambaz/Courses/${cid}/Quizzes/${q._id}`}
                      className="fw-bold text-decoration-none text-dark"
                    >
                      {q.title || "Untitled Quiz"}
                    </Link>
                    <div className="text-muted small">
                      {availabilityLabel(q)} | <b>Due</b> {formatDateTime(q.due)} |{" "}
                      {q.points ?? 0} pts | {numQs} {numQs === 1 ? "Question" : "Questions"}
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-2 pt-1">
                  {/* ✅/🚫 always visible, still clickable to toggle publish per requirement */}
                  {isPublished ? (
                    <FaCheckCircle
                      title="Published (click to unpublish)"
                      color="green"
                      style={{ cursor: "pointer" }}
                      onClick={() => togglePublish(q)}
                    />
                  ) : (
                    <FaBan
                      title="Unpublished (click to publish)"
                      color="gray"
                      style={{ cursor: "pointer" }}
                      onClick={() => togglePublish(q)}
                    />
                  )}

                  {/* 3-dots context menu with Edit, Delete, Publish/Unpublish */}
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      as="span"
                      style={{ cursor: "pointer" }}
                      id={`quiz-${q._id}-menu`}
                      aria-label="Quiz actions"
                    >
                      <BsThreeDotsVertical />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() =>
                          navigate(`/Kambaz/Courses/${cid}/Quizzes/${q._id}`)
                        }
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDelete(q._id)}>
                        Delete
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => togglePublish(q)}>
                        {isPublished ? "Unpublish" : "Publish"}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </div>
  );
}