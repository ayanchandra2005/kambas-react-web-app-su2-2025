import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Nav, Button, Card, Form, InputGroup } from "react-bootstrap";
import {
  listQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  type Question,
  type QuestionType,
} from "./client";

const typeOptions: { label: string; value: QuestionType }[] = [
  { label: "Multiple Choice", value: "MCQ" },
  { label: "True / False", value: "TRUE_FALSE" },
  { label: "Fill in the Blank", value: "FIB" },
];

function defaultForType(type: QuestionType): Partial<Question> {
  switch (type) {
    case "TRUE_FALSE":
      return { correctTrue: true };
    case "FIB":
      return { correctAnswers: [""] };
    case "MCQ":
    default:
      return { choices: ["", ""], correctIndex: 0 };
  }
}

export default function QuestionsTab() {
  const { cid, qid } = useParams();
  const [items, setItems] = useState<(Question & { editing?: boolean })[]>([]);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const totalPoints = useMemo(
    () => items.reduce((sum, q) => sum + (Number(q.points) || 0), 0),
    [items]
  );

  const fetchAll = async () => {
    if (!qid) return;
    const data = await listQuestions(qid);
    setItems(data);
  };
  useEffect(() => { fetchAll(); }, [qid]);

  const addNew = async () => {
    if (!qid) return;
    setAdding(true);
    try {
      const created = await createQuestion(qid, {
        type: "MCQ",
        title: "New Question",
        points: 1,
        prompt: "",
        ...defaultForType("MCQ"),
      });
      setItems(prev => prev.concat([{ ...created, editing: true }]));
    } finally {
      setAdding(false);
    }
  };

  const saveOne = async (draft: Question) => {
    setSavingId(draft._id || "");
    const saved = await updateQuestion(draft);
    setItems(prev => prev.map(q => (q._id === saved._id ? { ...saved, editing: false } : q)));
    setSavingId(null);
  };

  const removeOne = async (id: string) => {
    if (!window.confirm("Delete this question?")) return;
    await deleteQuestion(id);
    setItems(prev => prev.filter(q => q._id !== id));
  };

  const switchType = (q: Question, type: QuestionType) => {
    setItems(prev =>
      prev.map(it =>
        it._id === q._id ? { ...it, type, ...defaultForType(type) } : it
      )
    );
  };

  return (
    <div className="p-3">
      {/* 🔁 Use the same Nav tabs header as the editor */}
      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link
            as={Link}
            to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/Edit`}
          >
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/Edit/Questions`}
            active
          >
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Header actions */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="fw-semibold">Points: {totalPoints}</div>
        <Button onClick={addNew} disabled={adding}>
          + New Question
        </Button>
      </div>

      {items.length === 0 && (
        <div className="text-muted">No questions yet. Click “New Question”.</div>
      )}

      <div className="d-flex flex-column gap-3">
        {items.map((q, idx) => (
          <Card key={q._id || idx}>
            <Card.Body>
              {/* title + points */}
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div className="w-75">
                  {!q.editing ? (
                    <>
                      <div className="fw-bold">{q.title}</div>
                      <div className="text-muted small">
                        {q.type} · {q.points ?? 0} pts
                      </div>
                    </>
                  ) : (
                    <>
                      <Form.Control
                        className="mb-2"
                        value={q.title}
                        onChange={(e) =>
                          setItems(prev =>
                            prev.map(it =>
                              it._id === q._id ? { ...it, title: e.target.value } : it
                            )
                          )
                        }
                        placeholder="Question title"
                      />
                      <InputGroup className="mb-2" style={{ maxWidth: 220 }}>
                        <InputGroup.Text>Points</InputGroup.Text>
                        <Form.Control
                          type="number"
                          value={q.points}
                          onChange={(e) =>
                            setItems(prev =>
                              prev.map(it =>
                                it._id === q._id
                                  ? { ...it, points: Number(e.target.value) }
                                  : it
                              )
                            )
                          }
                        />
                      </InputGroup>
                    </>
                  )}
                </div>

                <div className="text-end">
                  {!q.editing ? (
                    <>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="me-2"
                        onClick={() =>
                          setItems(prev =>
                            prev.map(it =>
                              it._id === q._id ? { ...it, editing: true } : it
                            )
                          )
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => q._id && removeOne(q._id)}
                      >
                        Delete
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="me-2"
                        onClick={() =>
                          setItems(prev =>
                            prev.map(it =>
                              it._id === q._id ? { ...it, editing: false } : it
                            )
                          )
                        }
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        disabled={savingId === q._id}
                        onClick={() => saveOne(q)}
                      >
                        {savingId === q._id ? "Saving..." : "Save"}
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Type selector (edit mode) */}
              {q.editing && (
                <div className="mb-3" style={{ maxWidth: 320 }}>
                  <Form.Label>Question Type</Form.Label>
                  <Form.Select
                    value={q.type}
                    onChange={(e) => switchType(q, e.target.value as QuestionType)}
                  >
                    {typeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              )}

              {/* Prompt */}
              {q.editing ? (
                <Form.Group className="mb-3">
                  <Form.Label>Question</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={q.prompt}
                    onChange={(e) =>
                      setItems(prev =>
                        prev.map(it =>
                          it._id === q._id ? { ...it, prompt: e.target.value } : it
                        )
                      )
                    }
                  />
                </Form.Group>
              ) : (
                q.prompt && <div className="mb-2">{q.prompt}</div>
              )}

              {/* Type-specific editors */}
              {q.editing && q.type === "MCQ" && (
                <div className="mb-2">
                  <Form.Label>Choices (select the correct one)</Form.Label>
                  {(q.choices ?? []).map((choice, i) => (
                    <InputGroup className="mb-2" key={i}>
                      <InputGroup.Checkbox
                        checked={q.correctIndex === i}
                        onChange={() =>
                          setItems(prev =>
                            prev.map(it =>
                              it._id === q._id ? { ...it, correctIndex: i } : it
                            )
                          )
                        }
                      />
                      <Form.Control
                        value={choice}
                        onChange={(e) =>
                          setItems(prev =>
                            prev.map(it =>
                              it._id === q._id
                                ? {
                                    ...it,
                                    choices: (it.choices ?? []).map((c, idx) =>
                                      idx === i ? e.target.value : c
                                    ),
                                  }
                                : it
                            )
                          )
                        }
                      />
                      <Button
                        variant="outline-danger"
                        onClick={() =>
                          setItems(prev =>
                            prev.map(it =>
                              it._id === q._id
                                ? {
                                    ...it,
                                    choices: (it.choices ?? []).filter((_c, idx) => idx !== i),
                                    correctIndex:
                                      (it.correctIndex ?? 0) === i
                                        ? 0
                                        : it.correctIndex && it.correctIndex > i
                                        ? it.correctIndex - 1
                                        : it.correctIndex,
                                  }
                                : it
                            )
                          )
                        }
                      >
                        −
                      </Button>
                    </InputGroup>
                  ))}
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() =>
                      setItems(prev =>
                        prev.map(it =>
                          it._id === q._id ? { ...it, choices: [...(it.choices ?? []), ""] } : it
                        )
                      )
                    }
                  >
                    + Choice
                  </Button>
                </div>
              )}

              {q.editing && q.type === "TRUE_FALSE" && (
                <div className="mb-2">
                  <Form.Label>Correct Answer</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      label="True"
                      type="radio"
                      name={`tf-${q._id}`}
                      checked={q.correctTrue === true}
                      onChange={() =>
                        setItems(prev =>
                          prev.map(it => (it._id === q._id ? { ...it, correctTrue: true } : it))
                        )
                      }
                    />
                    <Form.Check
                      inline
                      label="False"
                      type="radio"
                      name={`tf-${q._id}`}
                      checked={q.correctTrue === false}
                      onChange={() =>
                        setItems(prev =>
                          prev.map(it => (it._id === q._id ? { ...it, correctTrue: false } : it))
                        )
                      }
                    />
                  </div>
                </div>
              )}

              {q.editing && q.type === "FIB" && (
                <div className="mb-2">
                  <Form.Label>Accepted Answers (one per line)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={(q.correctAnswers ?? [""]).join("\n")}
                    onChange={(e) => {
                      const arr = e.target.value.split("\n").map(s => s.trim());
                      setItems(prev =>
                        prev.map(it =>
                          it._id === q._id ? { ...it, correctAnswers: arr } : it
                        )
                      );
                    }}
                  />
                  <div className="text-muted small mt-1">
                    Matching can be case-insensitive on the server when grading.
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>

      <div className="mt-4 d-flex justify-content-end">
        <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}`} className="btn btn-secondary">
          Done
        </Link>
      </div>
    </div>
  );
}