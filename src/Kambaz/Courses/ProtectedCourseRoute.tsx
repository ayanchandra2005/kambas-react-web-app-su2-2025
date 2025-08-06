import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export default function ProtectedCourseRoute({ children }: { children: React.ReactNode }) {
  const { cid: courseId } = useParams(); // Match your route param
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollments = useSelector((state: any) => state.courses.enrollments);

  const isFaculty = currentUser?.role === "FACULTY";
  const isEnrolled = enrollments.some(
    (e: any) => e.user === currentUser?._id && e.course === courseId
  );

  if (isFaculty || isEnrolled) {
    return <>{children}</>;
  }

  return <Navigate to="/Kambaz/Dashboard" replace />;
}