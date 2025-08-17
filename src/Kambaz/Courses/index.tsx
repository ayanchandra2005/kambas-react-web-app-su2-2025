import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import People from "./People";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/details";
import QuizEditor from "./Quizzes/Editor";
import QuizQuestions from "./Quizzes/Questions";
import QuizPreview from "./Quizzes/Preview";
import TakeQuiz from "./Quizzes/Take";


type Course = {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
};

export default function Courses({ courses }: { courses: Course[] }) {
  const { cid } = useParams();
  const course = courses.find((c) => c._id === cid);
  const { pathname } = useLocation();

  return (
    <div id="wd-courses">
      <h2>
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />

            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/Editor" element={<AssignmentEditor />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />

            <Route path="People" element={<People />} />
            <Route path="Zoom" element={<h2>Zoom</h2>} />
            <Route path="Grades" element={<h2>Grades</h2>} />
            <Route path="Piazza" element={<h2>Piazza</h2>} />

            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:qid" element={<QuizDetails />} />
            <Route path="Quizzes/:qid/Preview" element={<QuizPreview />} />
            <Route path="Quizzes/:qid/Take" element={<TakeQuiz />} />
            <Route path="Quizzes/:qid/Edit/*" element={<QuizEditor />} />
            <Route path="Quizzes/:qid/Edit/Questions" element={<QuizQuestions />} />
            
          </Routes>
        </div>
      </div>
    </div>
  );
}