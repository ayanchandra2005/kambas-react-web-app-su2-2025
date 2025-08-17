import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { getQuizDetails } from "./client";

function fmt(date?: string) {
  if (!date) return "—";
  const d = new Date(date);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const role = currentUser?.role; // "FACULTY" | "STUDENT" | etc.

  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!qid) return;
      try {
        const data = await getQuizDetails(qid);
        setQuiz(data);
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    load();
  }, [qid]);

  const totalPoints = useMemo(() => {
    if (!quiz) return 0;
    if (typeof quiz.points === "number") return quiz.points;
    if (Array.isArray(quiz.questions)) {
      return quiz.questions.reduce(
        (sum: number, q: any) => sum + (Number(q.points) || 0),
        0
      );
    }
    return 0;
  }, [quiz]);

  if (loading) return <div className="p-4 text-muted">Loading quiz…</div>;
  if (!quiz) return <div className="p-4 text-muted">Quiz not found.</div>;

  return (
    <div id="wd-quiz-details" className="p-3">
      {/* Top actions */}
      <div className="d-flex gap-2 mb-3">
        {role === "FACULTY" ? (
          <>
            <Button
              variant="light"
              onClick={() =>
                navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Preview`)
              }
            >
              Preview
            </Button>
            <Button
              variant="light"
              onClick={() =>
                navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Edit`)
              }
            >
              <span className="me-1">✎</span> Edit
            </Button>
          </>
        ) : (
          <Button
            variant="success"
            onClick={() =>
              navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Take`)
            }
            id="wd-take-quiz-btn"
          >
            Start Quiz
          </Button>
        )}
      </div>

      {/* Panel */}
      <div
        className="p-3"
        style={{
          border: "2px dashed #c7c7c7",
          borderRadius: 6,
        }}
      >
        {/* Title */}
        <h2 className="mb-4">{quiz.title || "Untitled Quiz"}</h2>

        {/* Spec list */}
        <div className="mb-4">
          {[
            ["Quiz Type", quiz.type || "Graded Quiz"],
            ["Points", totalPoints],
            ["Assignment Group", (quiz.group || "QUIZZES").toString().toUpperCase()],
            ["Shuffle Answers", (quiz.shuffleAnswers ?? false) ? "Yes" : "No"],
            ["Time Limit", `${quiz.timeLimit ?? 20} Minutes`],
            ["Multiple Attempts", quiz.multipleAttempts ? "Yes" : "No"],
            ["View Responses", quiz.viewResponses ?? "Always"],
            ["Show Correct Answers", quiz.showCorrectAnswers ?? "Immediately"],
            ["One Question at a Time", (quiz.oneQuestionAtATime ?? true) ? "Yes" : "No"],
            ["Require Respondus LockDown Browser", quiz.lockdownBrowser ? "Yes" : "No"],
            ["Required to View Quiz Results", quiz.requireToViewResults ? "Yes" : "No"],
            ["Webcam Required", quiz.webcamRequired ? "Yes" : "No"],
            ["Lock Questions After Answering", quiz.lockAfterAnswering ? "Yes" : "No"],
          ].map(([label, value]) => (
            <div
              key={label as string}
              className="d-flex align-items-baseline py-1"
              style={{ columnGap: "1rem" }}
            >
              <div
                className="text-end fw-semibold"
                style={{ width: 240, minWidth: 240 }}
              >
                {label}
              </div>
              <div>{value as any}</div>
            </div>
          ))}
        </div>

        {/* Dates row */}
        <div className="mt-3">
          <div
            className="d-flex text-muted fw-semibold border-top pt-2"
            style={{ columnGap: "2rem" }}
          >
            <div style={{ width: 200, minWidth: 200 }}>Due</div>
            <div style={{ width: 200, minWidth: 200 }}>For</div>
            <div style={{ width: 200, minWidth: 200 }}>Available from</div>
            <div style={{ width: 200, minWidth: 200 }}>Until</div>
          </div>
          <div
            className="d-flex pt-2"
            style={{ columnGap: "2rem", borderBottom: "1px solid #e5e5e5" }}
          >
            <div style={{ width: 200, minWidth: 200 }}>{fmt(quiz.due)}</div>
            <div style={{ width: 200, minWidth: 200 }}>{quiz.for ?? "Everyone"}</div>
            <div style={{ width: 200, minWidth: 200 }}>{fmt(quiz.availableFrom)}</div>
            <div style={{ width: 200, minWidth: 200 }}>{fmt(quiz.availableUntil)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}