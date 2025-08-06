import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import ProtectedRoute from "./Account/ProtectedRoute";
import { addCourse, deleteCourse, updateCourse } from "./Courses/reducer";
import "./styles.css";
import ProtectedCourseRoute from "./Courses/ProtectedCourseRoute";

export default function Kambaz() {
  const dispatch = useDispatch();
  const courses = useSelector((state: { courses: { courses: any[] } }) => state.courses.courses);

  const [course, setCourse] = useState({
    _id: "",
    name: "",
    number: "",
    startDate: "",
    endDate: "",
    department: "",
    credits: 0,
    description: "",
  });

  const handleAddCourse = () => {
    dispatch(addCourse({ ...course, _id: uuidv4() }));
  };

  const handleDeleteCourse = (id: string) => {
    dispatch(deleteCourse(id));
  };

  const handleUpdateCourse = () => {
    dispatch(updateCourse(course));
  };

  return (
    <div id="wd-kambaz">
      <KambazNavigation />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="Account/*" element={<Account />} />
          <Route
            path="Dashboard"
            element={
              <ProtectedRoute>
                <Dashboard
                  courses={courses}
                  course={course}
                  setCourse={setCourse}
                  addNewCourse={handleAddCourse}
                  deleteCourse={handleDeleteCourse}
                  updateCourse={handleUpdateCourse}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="Courses/:cid/*"
            element={
              <ProtectedCourseRoute>
                  <Courses courses={courses} />
              </ProtectedCourseRoute>
            }
          />
          <Route path="Calendar" element={<h1>Calendar</h1>} />
          <Route path="Inbox" element={<h1>Inbox</h1>} />
        </Routes>
      </div>
    </div>
  );
}