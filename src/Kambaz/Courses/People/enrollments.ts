import axios from "axios";

const HTTP_SERVER = import.meta.env.VITE_HTTP_SERVER;

export const enrollUserInCourse = async (userId: string, courseId: string) => {
  const response = await axios.post(
    `${HTTP_SERVER}/api/users/${userId}/enrollments/${courseId}`
  );
  return response.data;
};

export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
  const response = await axios.delete(
    `${HTTP_SERVER}/api/users/${userId}/enrollments/${courseId}`
  );
  return response.data;
};

export const getUserEnrollments = async (userId: string) => {
  const response = await axios.get(`${HTTP_SERVER}/api/users/${userId}/enrollments`);
  return response.data;
};