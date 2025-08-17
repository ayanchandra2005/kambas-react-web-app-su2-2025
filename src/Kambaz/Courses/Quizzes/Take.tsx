// src/Kambaz/Courses/Quizzes/Take.tsx
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getQuizDetails, submitAttempt, getMyLastAttempt } from "./client";

export default function TakeQuiz() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const [last, setLast] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      if (!qid) return;
      try {
        const q = await getQuizDetails(qid);
        setQuiz(q);

        // initialize answers array with question ids
        const init = (q.questions ?? []).map((qq: any) => ({
          questionId: qq._id,
        }));
        setAnswers(init);

        // last attempt is optional — ignore 401 (unauthenticated)
        try {
          const prev = await getMyLastAttempt(qid);
          setLast(prev ?? null);
        } catch (e: any) {
          if (e?.response?.status !== 401) {
            console.error("Fetching last attempt failed:", e);
          }
          setLast(null);
        }
      } catch (e) {
        console.error("Failed to load quiz:", e);
        setQuiz(null);
      }
    };
    load();
  }, [qid]);

  const pointsTotal = useMemo(
    () =>
      (quiz?.questions ?? []).reduce(
        (sum: number, q: any) => sum + (Number(q.points) || 0),
        0
      ),
    [quiz]
  );

  const setAnswer = (questionId: string, patch: any) =>
    setAnswers((prev) =>
      prev.map((a) => (a.questionId === questionId ? { ...a, ...patch } : a))
    );

  const onSubmit = async () => {
    if (!qid) return;
    setSubmitting(true);
    try {
      const graded = await submitAttempt(qid, answers);
      setResult(graded);
    } catch (e: any) {
      const msg = e?.response?.data?.message || "Submit failed";
      alert(msg);
      if (e?.response?.status === 403) {
        // No attempts remaining -> back to details
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!quiz) return <div className="p-3 text-muted">Loading…</div>;

  // After submit, show graded review
  if (result) {
    const byId: Record<string, any> = {};
    (result.answers ?? []).forEach((a: any) => (byId[a.questionId] = a));

    return (
      <div className="p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="m-0">{quiz.title}</h3>
          <div className="fw-semibold">
            Score: {result.score} / {pointsTotal}
          </div>
        </div>

        {(quiz.questions ?? []).map((q: any, idx: number) => {
          const a = byId[q._id] || {};
          const ok = !!a.correct;
          return (
            <div
              key={q._id}
              className={`p-3 mb-3 border rounded ${
                ok ? "border-success" : "border-danger"
              }`}
            >
              <div className="d-flex justify-content-between">
                <div className="fw-semibold">
                  Question {idx + 1} — {q.points ?? 0} pts
                </div>
                <div className={ok ? "text-success" : "text-danger"}>
                  {ok ? "Correct ✓" : "Incorrect ✗"}
                </div>
              </div>
              <div className="mt-2">{q.prompt}</div>

              {q.type === "MCQ" && (
                <ul className="mt-2">
                  {(q.choices ?? []).map((c: string, i: number) => (
                    <li
                      key={i}
                      className={
                        i === q.correctIndex
                          ? "text-success"
                          : i === a.mcqIndex
                          ? "text-danger"
                          : ""
                      }
                    >
                      {c}
                      {i === q.correctIndex ? " (correct)" : ""}
                      {i === a.mcqIndex && i !== q.correctIndex ? " (your answer)" : ""}
                    </li>
                  ))}
                </ul>
              )}

              {q.type === "TRUE_FALSE" && (
                <div className="mt-2">
                  Correct: <b>{q.correctTrue ? "True" : "False"}</b> — Your answer:{" "}
                  <b>
                    {a.tfValue === undefined ? "—" : a.tfValue ? "True" : "False"}
                  </b>
                </div>
              )}

              {q.type === "FIB" && (
                <div className="mt-2">
                  Accepted: {(q.correctAnswers ?? []).join(", ")} — Your answer:{" "}
                  <b>{a.fibText ?? ""}</b>
                </div>
              )}
            </div>
          );
        })}

        <div className="d-flex justify-content-end">
          <Link
            to={`/Kambaz/Courses/${cid}/Quizzes/${qid}`}
            className="btn btn-secondary"
          >
            Done
          </Link>
        </div>
      </div>
    );
  }

  // Taking form
  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="m-0">{quiz.title}</h3>
        <div className="text-muted">Points: {pointsTotal}</div>
      </div>

      {(quiz.questions ?? []).map((q: any, idx: number) => {
        // answer object might still be initializing; fall back to empty object
        const a = answers.find((x) => x.questionId === q._id) || {};
        return (
          <div key={q._id} className="p-3 mb-3 border rounded">
            <div className="fw-semibold">
              Question {idx + 1} — {q.points ?? 0} pts
            </div>
            <div className="mt-2">{q.prompt}</div>

            {q.type === "MCQ" && (
              <div className="mt-2">
                {(q.choices ?? []).map((c: string, i: number) => (
                  <div key={i} className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`mcq-${q._id}`}
                      checked={a.mcqIndex === i}
                      onChange={() => setAnswer(q._id, { mcqIndex: i })}
                    />
                    <label className="form-check-label">{c}</label>
                  </div>
                ))}
              </div>
            )}

            {q.type === "TRUE_FALSE" && (
              <div className="mt-2">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`tf-${q._id}`}
                    checked={a.tfValue === true}
                    onChange={() => setAnswer(q._id, { tfValue: true })}
                  />
                  <label className="form-check-label">True</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`tf-${q._id}`}
                    checked={a.tfValue === false}
                    onChange={() => setAnswer(q._id, { tfValue: false })}
                  />
                  <label className="form-check-label">False</label>
                </div>
              </div>
            )}

            {q.type === "FIB" && (
              <div className="mt-2" style={{ maxWidth: 420 }}>
                <input
                  className="form-control"
                  placeholder="Your answer"
                  value={a.fibText ?? ""}
                  onChange={(e) => setAnswer(q._id, { fibText: e.target.value })}
                />
              </div>
            )}
          </div>
        );
      })}

      <div className="d-flex justify-content-between">
        {last && (
          <div className="text-muted">
            Last score: <b>{last.score}</b> (Attempt #{last.attemptNumber})
          </div>
        )}
        <div className="d-flex gap-2">
          <Link
            to={`/Kambaz/Courses/${cid}/Quizzes/${qid}`}
            className="btn btn-outline-secondary"
          >
            Cancel
          </Link>
          <button
            className="btn btn-primary"
            onClick={onSubmit}
            disabled={submitting}
          >
            {submitting ? "Submitting…" : "Submit Quiz"}
          </button>
        </div>
      </div>
    </div>
  );
}