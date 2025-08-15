import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER = import.meta.env.VITE_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(COURSES_API, course);
  return data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module,
    { withCredentials: true }
  );
  return response.data;
};

export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API, {
    withCredentials: true,
  });
  return data;
};

export const updateCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${course._id}`,
    course,
    { withCredentials: true }
  );
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`, {
    withCredentials: true,
  });
  return data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/modules`, {
    withCredentials: true,
  });
  return response.data;
};

export const findAllCourses = async () => {
  const response = await axios.get(COURSES_API);
  return response.data;
};

export const findUsersForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/users`);
  return data;
};