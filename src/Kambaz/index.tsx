// src/Kambaz/index.tsx
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
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import "./styles.css";

export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [course, setCourse] = useState({
    _id: "", name: "", number: "",
    startDate: "", endDate: "", department: "",
    credits: 0, description: "",
  });

  // 👇 NEW: show All vs My Courses
  const [enrolling, setEnrolling] = useState<boolean>(false);

  const addNewCourse = async () => {
    const newCourse = await courseClient.createCourse(course);
    setCourses((prev) => [...prev, newCourse]);
    setCourse({
      _id: "", name: "", number: "", startDate: "", endDate: "",
      department: "", credits: 0, description: "",
    });
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses((prev) => prev.map((c) => (c._id === course._id ? course : c)));
  };

  const deleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    setCourses((prev) => prev.filter((c) => c._id !== courseId));
  };

  // 👇 NEW: just my courses
  const findCoursesForUser = async () => {
    if (!currentUser?._id) return;
    const mine = await userClient.findCoursesForUser(currentUser._id);
    setCourses(mine);
  };

  // 👇 NEW: all courses, and mark which ones I’m enrolled in
  const fetchCourses = async () => {
    if (!currentUser?._id) return;
    const all = await courseClient.fetchAllCourses();
    const mine = await userClient.findCoursesForUser(currentUser._id);
    const withFlags = all.map((c: any) =>
      mine.find((m: any) => m._id === c._id) ? { ...c, enrolled: true } : c
    );
    setCourses(withFlags);
  };

  // 👇 NEW: called by the Enroll/Unenroll button in Dashboard
  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    if (!currentUser?._id) return;
    if (enrolled) {
      await userClient.enrollIntoCourse(currentUser._id, courseId);
    } else {
      await userClient.unenrollFromCourse(currentUser._id, courseId);
    }
    setCourses(prev =>
      prev.map(c => (c._id === courseId ? { ...c, enrolled } : c))
    );
  };

  // 👇 Refetch when user or toggle changes
  useEffect(() => {
    if (!currentUser) return;
    if (enrolling) {
      fetchCourses();       // All courses with enrolled flags
    } else {
      findCoursesForUser(); // Only my courses
    }
  }, [currentUser, enrolling]);

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
                    enrolling={enrolling}
                    setEnrolling={setEnrolling}
                    updateEnrollment={updateEnrollment}
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