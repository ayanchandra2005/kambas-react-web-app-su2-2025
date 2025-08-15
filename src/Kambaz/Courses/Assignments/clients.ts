import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER = import.meta.env.VITE_HTTP_SERVER;
const COURSES_ENDPOINT = `${HTTP_SERVER}/api/courses`;
const ASSIGNMENTS_ENDPOINT = `${HTTP_SERVER}/api/assignments`;

export const getAssignmentsByCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_ENDPOINT}/${courseId}/assignments`
  );
  return data;
};

export const getAssignmentDetails = async (assignmentId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${ASSIGNMENTS_ENDPOINT}/${assignmentId}`
  );
  return data;
};

export const addNewAssignment = async (courseId: string, assignment: any) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_ENDPOINT}/${courseId}/assignments`,
    assignment
  );
  return data;
};

export const editAssignment = async (assignment: any) => {
  const { data } = await axiosWithCredentials.put(
    `${ASSIGNMENTS_ENDPOINT}/${assignment._id}`,
    assignment
  );
  return data;
};

export const removeAssignment = async (assignmentId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${ASSIGNMENTS_ENDPOINT}/${assignmentId}`
  );
  return data;
};