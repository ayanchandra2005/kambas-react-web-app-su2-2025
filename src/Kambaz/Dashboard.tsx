import { Button, Card, Col, Row } from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getUserEnrollments,
  enrollUserInCourse,
  unenrollUserFromCourse,
} from "./Courses/People/enrollments.ts";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => Promise<void>;
  deleteCourse: (courseId: string) => Promise<void>;
  updateCourse: () => Promise<void>;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const [showAllCourses, setShowAllCourses] = useState(false);
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

  const displayedCourses =
    showAllCourses || isFaculty
      ? courses
      : courses.filter((c) => enrolledCourseIds.includes(c._id));

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
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

      <div className="float-end">
        <button
          className="btn btn-info"
          onClick={() => setShowAllCourses((prev) => !prev)}
        >
          {showAllCourses ? "Show Enrolled Only" : "Show All Courses"}
        </button>
      </div>

      <h2 id="wd-dashboard-published">
        {showAllCourses || isFaculty ? "All Courses" : "Enrolled Courses"} (
        {displayedCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={4} className="g-4">
          {displayedCourses.map((course) => (
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
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {course.name}
                  </Card.Title>
                  <Card.Text
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    {course.description}
                  </Card.Text>

                  {isFaculty || enrolledCourseIds.includes(course._id) ? (
                    <Link
                      to={`/Kambaz/Courses/${course._id}/Home`}
                      className="btn btn-primary"
                    >
                      Go
                    </Link>
                  ) : (
                    <button className="btn btn-secondary" disabled>
                      Go
                    </button>
                  )}

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

                  {!isFaculty &&
                    (enrolledCourseIds.includes(course._id) ? (
                      <Button
                        className="btn btn-danger mt-2 w-100"
                        onClick={async () => {
                          await unenrollUserFromCourse(
                            currentUser._id,
                            course._id
                          );
                          await refreshEnrollments();
                        }}
                      >
                        Unenroll
                      </Button>
                    ) : (
                      <Button
                        className="btn btn-success mt-2 w-100"
                        onClick={async () => {
                          await enrollUserInCourse(
                            currentUser._id,
                            course._id
                          );
                          await refreshEnrollments();
                        }}
                      >
                        Enroll
                      </Button>
                    ))}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}