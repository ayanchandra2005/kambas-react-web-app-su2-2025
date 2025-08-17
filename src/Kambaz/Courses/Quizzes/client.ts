import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER = import.meta.env.VITE_HTTP_SERVER;
const COURSES_ENDPOINT = `${HTTP_SERVER}/api/courses`;
const QUIZZES_ENDPOINT = `${HTTP_SERVER}/api/quizzes`;

/** List quizzes for a course */
export const getQuizzesByCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_ENDPOINT}/${courseId}/quizzes`
  );
  return data;
};

/** Fetch a single quiz */
export const getQuizDetails = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_ENDPOINT}/${quizId}`
  );
  return data;
};

/** Create a quiz for a course (you can pass a partial; server can fill defaults) */
export const addNewQuiz = async (courseId: string, quiz: any = {}) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_ENDPOINT}/${courseId}/quizzes`,
    quiz
  );
  return data;
};

/** Update a quiz */
export const editQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_ENDPOINT}/${quiz._id}`,
    quiz
  );
  return data;
};

/** Delete a quiz */
export const removeQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${QUIZZES_ENDPOINT}/${quizId}`
  );
  return data;
};

/** Publish / Unpublish (server can also expose a single toggle endpoint if you prefer) */
export const publishQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_ENDPOINT}/${quizId}/publish`,
    { published: true }
  );
  return data;
};

export const unpublishQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_ENDPOINT}/${quizId}/publish`,
    { published: false }
  );
  return data;
};

// --- Questions API ---

export type QuestionType = "MCQ" | "TRUE_FALSE" | "FIB";

export interface Question {
  _id?: string;
  quiz?: string;             // server can fill on create
  type: QuestionType;
  title: string;
  points: number;
  prompt?: string;

  // MCQ
  choices?: string[];
  correctIndex?: number;

  // TRUE_FALSE
  correctTrue?: boolean;

  // FIB
  correctAnswers?: string[];
}

const QUESTIONS_ENDPOINT = `${HTTP_SERVER}/api/questions`;

/** List questions for a quiz */
export const listQuestions = async (quizId: string): Promise<Question[]> => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_ENDPOINT}/${quizId}/questions`
  );
  return data;
};

/** Create question for a quiz */
export const createQuestion = async (
  quizId: string,
  body: Partial<Question>
): Promise<Question> => {
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_ENDPOINT}/${quizId}/questions`,
    body
  );
  return data;
};

/** Update a question */
export const updateQuestion = async (q: Question): Promise<Question> => {
  if (!q._id) throw new Error("Question _id is required for update");
  const { data } = await axiosWithCredentials.put(
    `${QUESTIONS_ENDPOINT}/${q._id}`,
    q
  );
  return data;
};

/** Delete a question */
export const deleteQuestion = async (questionId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${QUESTIONS_ENDPOINT}/${questionId}`
  );
  return data;
};

// Attempts
export const submitAttempt = async (quizId: string, answers: any[]) => {
    const { data } = await axiosWithCredentials.post(
      `${QUIZZES_ENDPOINT}/${quizId}/attempts`,
      { answers }
    );
    return data;
  };
  
  export const getMyLastAttempt = async (quizId: string) => {
    const { data } = await axiosWithCredentials.get(
      `${QUIZZES_ENDPOINT}/${quizId}/attempts/me/last`
    );
    return data; // null if none
  };