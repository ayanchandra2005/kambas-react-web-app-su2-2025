import { Button, Card, Col, Row } from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getUserEnrollments,
} from "./Courses/People/enrollments.ts";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  enrolling,
  setEnrolling,
  updateEnrollment
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => Promise<void>;
  deleteCourse: (courseId: string) => Promise<void>;
  updateCourse: () => Promise<void>;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);

  const refreshEnrollments = async () => {
    if (currentUser?._id && !isFaculty) {
      const enrollments = await getUserEnrollments(currentUser._id);
      const ids = enrollments.map((e: any) => e.course);
      setEnrolledCourseIds(ids);
    }
  };

  useEffect(() => {
    refreshEnrollments();
  }, [currentUser, isFaculty]);

  const displayedCourses = courses;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title" className="d-flex justify-content-between">
        <span>Dashboard</span>
        {!isFaculty && (
          <button
            onClick={() => setEnrolling(!enrolling)}
            className="btn btn-primary"
          >
            {enrolling ? "My Courses" : "All Courses"}
          </button>
        )}
      </h1>
      <hr />

      {isFaculty && (
        <>
          <h5>New Course</h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <Button onClick={addNewCourse} className="mt-2 btn btn-success">
            Create Course
          </Button>
          <Button onClick={updateCourse} className="btn btn-success mt-2">
            Update Course
          </Button>
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {enrolling ? "All Courses" : "My Courses"} ({displayedCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={4} className="g-4">
          {displayedCourses.map((course) => {
            // prefer course.enrolled (from Kambaz) but fall back to local ids
            const isEnrolled =
              (course as any).enrolled ??
              enrolledCourseIds.includes(course._id);

            return (
              <Col
                key={course._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
                  <Card.Img
                    variant="top"
                    src="/images/reactjs.jpg"
                    width="100%"
                    height={160}
                  />
                  <Card.Body className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {/* Show the Enroll/Unenroll button ONLY when browsing (enrolling === true) */}
                      {enrolling && !isFaculty && (
                        <button
                          className={`btn ${
                            isEnrolled ? "btn-danger" : "btn-success"
                          } float-end`}
                          onClick={(event) => {
                            event.preventDefault();
                            updateEnrollment(course._id, !isEnrolled);
                          }}
                        >
                          {isEnrolled ? "Unenroll" : "Enroll"}
                        </button>
                      )}
                      {course.name}
                    </h5>

                    <Card.Text
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </Card.Text>

                    <Link
                      to={`/Kambaz/Courses/${course._id}/Home`}
                      className="btn btn-primary"
                    >
                      Go
                    </Link>

                    {isFaculty && (
                      <>
                        <button
                          onClick={() => deleteCourse(course._id)}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <Button
                          id="wd-edit-course-click"
                          onClick={() => setCourse(course)}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </Button>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}