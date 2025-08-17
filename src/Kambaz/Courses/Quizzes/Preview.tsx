import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getQuizDetails } from "./client";
import { Button, Card, Form, Alert, Spinner } from "react-bootstrap";

const norm = (s: string) => (s ?? "").trim().toLowerCase();

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<any>(null);

  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!qid) {
        setError("Missing quiz id.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await getQuizDetails(qid);
        setQuiz(data);
      } catch (e: any) {
        setError(e?.response?.data?.message || e?.message || "Failed to load quiz.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [qid]);

  const questions: any[] = quiz?.questions ?? [];
  const totalPoints = useMemo(
    () => questions.reduce((sum, q) => sum + (Number(q.points) || 0), 0),
    [questions]
  );

  const results = useMemo(() => {
    if (!submitted) return null;
    let score = 0;
    const details = questions.map((q) => {
      const pts = Number(q.points) || 0;
      const a = answers[q._id];
      let correct = false;
      if (q.type === "MCQ") correct = Number(a) === Number(q.correctIndex);
      else if (q.type === "TRUE_FALSE") correct = Boolean(a) === Boolean(q.correctTrue);
      else if (q.type === "FIB") {
        const set = (q.correctAnswers ?? []).map(norm);
        correct = set.length > 0 && set.includes(norm(a));
      }
      if (correct) score += pts;
      return { id: q._id, correct, pts };
    });
    return { score, details };
  }, [submitted, answers, questions]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setAns = (id: string, v: any) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [id]: v }));
  };

  if (loading) {
    return (
      <div className="p-4 text-muted d-flex align-items-center gap-2">
        <Spinner size="sm" /> Loading preview…
      </div>
    );
  }
  if (error) return <div className="p-4 text-danger">{error}</div>;
  if (!quiz) return <div className="p-4 text-muted">Quiz not found.</div>;

  return (
    <div id="wd-quiz-preview" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="m-0">{quiz.title || "Quiz Preview"}</h3>
        <Link
          to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/Edit/Questions`}
          className="btn btn-outline-secondary"
        >
          Keep Editing This Quiz
        </Link>
      </div>

      {submitted && results && (
        <Alert variant="info">Preview score: <b>{results.score}</b> / {totalPoints}</Alert>
      )}

      <Form onSubmit={submit}>
        {questions.length === 0 && (
          <div className="text-muted">This quiz has no questions yet.</div>
        )}

        <div className="d-flex flex-column gap-3">
          {questions.map((q: any, i: number) => {
            const pts = Number(q.points) || 0;
            const a = answers[q._id];
            let correct = false;
            if (submitted) {
              if (q.type === "MCQ") correct = Number(a) === Number(q.correctIndex);
              else if (q.type === "TRUE_FALSE") correct = Boolean(a) === Boolean(q.correctTrue);
              else if (q.type === "FIB") {
                const set = (q.correctAnswers ?? []).map(norm);
                correct = set.includes(norm(a));
              }
            }

            return (
              <Card key={q._id || i}>
                <Card.Header className="d-flex justify-content-between">
                  <div>Question {i + 1}</div>
                  <div>{pts} pts</div>
                </Card.Header>
                <Card.Body>
                  {q.prompt && <div className="mb-3">{q.prompt}</div>}

                  {q.type === "MCQ" && (
                    <div className="d-flex flex-column gap-2">
                      {(q.choices ?? []).map((choice: string, idx: number) => (
                        <Form.Check
                          key={idx}
                          type="radio"
                          name={`mcq-${q._id}`}
                          label={choice}
                          disabled={submitted}
                          checked={Number(a) === idx}
                          onChange={() => setAns(q._id, idx)}
                        />
                      ))}
                    </div>
                  )}

                  {q.type === "TRUE_FALSE" && (
                    <div>
                      <Form.Check
                        inline type="radio" name={`tf-${q._id}`} label="True"
                        disabled={submitted} checked={a === true}
                        onChange={() => setAns(q._id, true)}
                      />
                      <Form.Check
                        inline type="radio" name={`tf-${q._id}`} label="False"
                        disabled={submitted} checked={a === false}
                        onChange={() => setAns(q._id, false)}
                      />
                    </div>
                  )}

                  {q.type === "FIB" && (
                    <Form.Control
                      type="text" placeholder="Type your answer"
                      disabled={submitted} value={a ?? ""}
                      onChange={(e) => setAns(q._id, e.target.value)}
                      style={{ maxWidth: 420 }}
                    />
                  )}

                  {submitted && (
                    <div className="mt-3">
                      {correct ? (
                        <span className="text-success">✔ Correct</span>
                      ) : (
                        <span className="text-danger">✘ Incorrect</span>
                      )}
                    </div>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </div>

        <div className="d-flex justify-content-end gap-2 mt-3">
          {!submitted ? (
            <Button type="submit">Submit Quiz</Button>
          ) : (
            <Button
              variant="secondary"
              onClick={() => {
                setSubmitted(false);
                setAnswers({});
              }}
            >
              Retake (Preview)
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}