import { createSlice } from "@reduxjs/toolkit";
import { courses as defaultCourses, enrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";

// type Enrollment = {
//   _id: string;
//   user: string;
//   course: string;
// };

const initialState = {
  courses: defaultCourses,
  enrollments: enrollments,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      const incoming = action.payload;
      const course = {
        _id: incoming._id || uuidv4(),
        name: incoming.name,
        number: incoming.number,
        startDate: incoming.startDate,
        endDate: incoming.endDate,
        department: incoming.department || "CS",
        credits: incoming.credits || 3,
        description: incoming.description,
      };
      state.courses.push(course);
    },

    deleteCourse: (state, action) => {
      const id = action.payload;
      state.courses = state.courses.filter((c) => c._id !== id);
    },

    updateCourse: (state, action) => {
      const updated = action.payload;
      state.courses = state.courses.map((c) =>
        c._id === updated._id ? updated : c
      );
    },

    editCourse: (state, action) => {
      const id = action.payload;
      state.courses = state.courses.map((c) =>
        c._id === id ? { ...c, editing: true } : c
      );
    },

    enroll: (state, action) => {
      const { user, course } = action.payload;
      const alreadyEnrolled = state.enrollments.some(
        (e) => e.user === user && e.course === course
      );
      if (!alreadyEnrolled) {
        state.enrollments.push({ _id: uuidv4(), user, course });
      }
    },

    unenroll: (state, action) => {
      const { user, course } = action.payload;
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === user && e.course === course)
      );
    },
  },
});

export const {
  addCourse,
  deleteCourse,
  updateCourse,
  editCourse,
  enroll,
  unenroll,
} = courseSlice.actions;

export default courseSlice.reducer;
