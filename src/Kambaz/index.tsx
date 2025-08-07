import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import { useSelector } from "react-redux";

import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import ProtectedRoute from "./Account/ProtectedRoute";
import ProtectedCourseRoute from "./Courses/ProtectedCourseRoute";
import Session from "./Account/Session";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import "./styles.css";

export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

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

  const addNewCourse = async () => {
    try {
      const newCourse = await userClient.createCourse(course);
      setCourses([...courses, newCourse]);
      setCourse({
        _id: "",
        name: "",
        number: "",
        startDate: "",
        endDate: "",
        department: "",
        credits: 0,
        description: "",
      });
    } catch (err) {
      console.error("Failed to create course:", err);
    }
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(courses.map((c) => {
      if (c._id === course._id) { return course; }
      else { return c; }
    }));
  };

  const deleteCourse = async (courseId: string) => {
  try {
    await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  } catch (err) {
    console.error("Failed to delete course:", err);
  }
};

  useEffect(() => {
  const fetchCourses = async () => {
    try {
      if (currentUser?.role === "FACULTY") {
        const courses = await userClient.findMyCourses();
        setCourses(courses);
      } else {
        const courses = await courseClient.findAllCourses();
        setCourses(courses);
      }
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    }
  };

  fetchCourses();
}, [currentUser]);

  return (
    <Session>
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
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
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
    </Session>
  );
}