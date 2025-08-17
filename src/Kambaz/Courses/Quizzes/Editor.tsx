import { useEffect, useMemo, useState } from "react";
import { Nav } from "react-bootstrap";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { getQuizDetails, editQuiz } from "./client";

function toInputLocal(dt?: string) {
  if (!dt) return "";
  // Convert to yyyy-MM-ddTHH:mm for <input type="datetime-local">
  const d = new Date(dt);
  const pad = (n: number) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const MM = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mm = pad(d.getMinutes());
  return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
}

function fromInputLocal(v?: string) {
  if (!v) return undefined as any;
  // Browser returns local time; store as ISO
  return new Date(v).toISOString();
}

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<any>(null);

  // Editable fields (keep flat/simple)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [type, setType] = useState<"GRADED" | "PRACTICE" | "GRADED_SURVEY" | "UNGRADED_SURVEY">("GRADED");
  const [group, setGroup] = useState<"QUIZZES" | "EXAMS" | "ASSIGNMENTS" | "PROJECT">("QUIZZES");

  const [shuffleAnswers, setShuffleAnswers] = useState(true);
  const [timeLimit, setTimeLimit] = useState<number>(20);

  const [multipleAttempts, setMultipleAttempts] = useState(false);
  const [howManyAttempts, setHowManyAttempts] = useState<number>(1);

  const [showCorrectAnswers, setShowCorrectAnswers] = useState<string>("Immediately");
  const [accessCode, setAccessCode] = useState<string>("");

  const [oneQuestionAtATime, setOneQuestionAtATime] = useState(true);
  const [webcamRequired, setWebcamRequired] = useState(false);
  const [lockAfterAnswering, setLockAfterAnswering] = useState(false);

  const [due, setDue] = useState<string>("");
  const [availableFrom, setAvailableFrom] = useState<string>("");
  const [availableUntil, setAvailableUntil] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      if (!qid) return;
      try {
        const data = await getQuizDetails(qid);
        setQuiz(data);

        setTitle(data.title ?? "");
        setDescription(data.description ?? "");

        setType(data.type ?? "GRADED");
        setGroup((data.group ?? "QUIZZES").toUpperCase());

        setShuffleAnswers(data.shuffleAnswers ?? true);
        setTimeLimit(data.timeLimit ?? 20);

        setMultipleAttempts(data.multipleAttempts ?? false);
        setHowManyAttempts(data.howManyAttempts ?? 1);

        setShowCorrectAnswers(data.showCorrectAnswers ?? "Immediately");
        setAccessCode(data.accessCode ?? "");

        setOneQuestionAtATime(data.oneQuestionAtATime ?? true);
        setWebcamRequired(data.webcamRequired ?? false);
        setLockAfterAnswering(data.lockAfterAnswering ?? false);

        setDue(toInputLocal(data.due));
        setAvailableFrom(toInputLocal(data.availableFrom));
        setAvailableUntil(toInputLocal(data.availableUntil));
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    load();
  }, [qid]);

  // Points: sum of question points if available; else fallback to stored quiz.points
  const points = useMemo(() => {
    if (Array.isArray(quiz?.questions) && quiz.questions.length > 0) {
      return quiz.questions.reduce(
        (sum: number, q: any) => sum + (Number(q.points) || 0),
        0
      );
    }
    return Number(quiz?.points ?? 0);
  }, [quiz]);

  const onSave = async (publishAfterSave = false) => {
    if (!qid) return;
    const payload = {
      _id: qid,
      title,
      description,
      type,
      group,
      shuffleAnswers,
      timeLimit: Number(timeLimit),
      multipleAttempts,
      howManyAttempts: Number(howManyAttempts) || 1,
      showCorrectAnswers,
      accessCode,
      oneQuestionAtATime,
      webcamRequired,
      lockAfterAnswering,
      // never trust client for points; server can recompute from questions
      points,
      due: fromInputLocal(due),
      availableFrom: fromInputLocal(availableFrom),
      availableUntil: fromInputLocal(availableUntil),
      ...(publishAfterSave ? { published: true } : {}),
    };

    await editQuiz(payload);

    if (publishAfterSave) {
      // Back to quizzes list
      navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    } else {
      // Back to details
      navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
    }
  };

  const onCancel = () => navigate(`/Kambaz/Courses/${cid}/Quizzes`);

  if (loading) return <div className="p-4 text-muted">Loading editor…</div>;
  if (!quiz) return <div className="p-4 text-muted">Quiz not found.</div>;

//   const onQuestionsTab = location.pathname.endsWith("/Questions");

  const onQuestionsTab =
    location.pathname.split("/").pop()?.toLowerCase() === "questions";

  if (loading) return <div className="p-4 text-muted">Loading editor…</div>;
  if (!quiz) return <div className="p-4 text-muted">Quiz not found.</div>;

  return (
    <div id="wd-quiz-editor" className="p-3">
      {/* Tabs */}
      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link
            as={Link}
            to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/Edit`}
            active={!onQuestionsTab}
          >
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/Edit/Questions`}
            active={onQuestionsTab}
          >
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* DETAILS PANEL */}
      {!onQuestionsTab && (
        <div className="border rounded p-3">
          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Quiz title"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control"
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the quiz (you can replace with a real WYSIWYG later)"
            />
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">Quiz Type</label>
              <select
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value as any)}
              >
                <option value="GRADED">Graded Quiz</option>
                <option value="PRACTICE">Practice Quiz</option>
                <option value="GRADED_SURVEY">Graded Survey</option>
                <option value="UNGRADED_SURVEY">Ungraded Survey</option>
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">Points</label>
              <input className="form-control" value={points} disabled />
              <div className="form-text">Sum of all question points</div>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">Assignment Group</label>
              <select
                className="form-select"
                value={group}
                onChange={(e) => setGroup(e.target.value as any)}
              >
                <option value="QUIZZES">Quizzes</option>
                <option value="EXAMS">Exams</option>
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="PROJECT">Project</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">Shuffle Answers</label>
              <select
                className="form-select"
                value={shuffleAnswers ? "YES" : "NO"}
                onChange={(e) => setShuffleAnswers(e.target.value === "YES")}
              >
                <option value="YES">Yes</option>
                <option value="NO">No</option>
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">Time Limit</label>
              <div className="input-group">
                <input
                  className="form-control"
                  type="number"
                  min={0}
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(Number(e.target.value))}
                />
                <span className="input-group-text">Minutes</span>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">Multiple Attempts</label>
              <select
                className="form-select"
                value={multipleAttempts ? "YES" : "NO"}
                onChange={(e) => setMultipleAttempts(e.target.value === "YES")}
              >
                <option value="NO">No</option>
                <option value="YES">Yes</option>
              </select>
            </div>
          </div>

          {multipleAttempts && (
            <div className="mb-3">
              <label className="form-label fw-semibold">How Many Attempts</label>
              <input
                className="form-control"
                type="number"
                min={1}
                value={howManyAttempts}
                onChange={(e) => setHowManyAttempts(Number(e.target.value))}
              />
            </div>
          )}

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Show Correct Answers</label>
              <input
                className="form-control"
                value={showCorrectAnswers}
                onChange={(e) => setShowCorrectAnswers(e.target.value)}
                placeholder="e.g., Immediately / After Due Date / Never"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Access Code</label>
              <input
                className="form-control"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Leave blank for none"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">One Question at a Time</label>
              <select
                className="form-select"
                value={oneQuestionAtATime ? "YES" : "NO"}
                onChange={(e) => setOneQuestionAtATime(e.target.value === "YES")}
              >
                <option value="YES">Yes</option>
                <option value="NO">No</option>
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">Webcam Required</label>
              <select
                className="form-select"
                value={webcamRequired ? "YES" : "NO"}
                onChange={(e) => setWebcamRequired(e.target.value === "YES")}
              >
                <option value="NO">No</option>
                <option value="YES">Yes</option>
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">Lock Questions After Answering</label>
              <select
                className="form-select"
                value={lockAfterAnswering ? "YES" : "NO"}
                onChange={(e) => setLockAfterAnswering(e.target.value === "YES")}
              >
                <option value="NO">No</option>
                <option value="YES">Yes</option>
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">Due Date</label>
              <input
                type="datetime-local"
                className="form-control"
                value={due}
                onChange={(e) => setDue(e.target.value)}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">Available From</label>
              <input
                type="datetime-local"
                className="form-control"
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">Until</label>
              <input
                type="datetime-local"
                className="form-control"
                value={availableUntil}
                onChange={(e) => setAvailableUntil(e.target.value)}
              />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={() => onSave(false)}>
              Save
            </button>
            <button className="btn btn-success" onClick={() => onSave(true)}>
              Save &amp; Publish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}