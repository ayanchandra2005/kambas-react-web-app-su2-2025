import { Button, Card, Col, Row } from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { enroll, unenroll } from "./Courses/reducer";
import { useState } from "react";

type Enrollment = {
  user: string;
  course: string;
};

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
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollments = useSelector((state: any) => state.courses.enrollments);
  const isFaculty = currentUser?.role === "FACULTY";
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);

  const isEnrolled = (courseId: string) =>
    enrollments.some(
      (e: Enrollment) => e.user === currentUser._id && e.course === courseId
    );

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
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
          <hr />
        </>
      )}

      <div className="float-end">
        <button
          className="btn btn-info"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "Show Enrolled Only" : "Show All Courses"}
        </button>
      </div>

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={4} className="g-4">
          {courses
            .filter((course) =>
              showAllCourses ? true : isEnrolled(course._id)
            )
            .map((course) => (
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

                    {isFaculty || isEnrolled(course._id) ? (
                      <Link
                        to={`/Kambaz/Courses/${course._id}/Home`}
                        className="btn btn-primary"
                      >
                        Go
                      </Link>
                    ) : (
                      <button className="btn btn-primary" disabled>
                        Go
                      </button>
                    )}

                    {!isFaculty &&
                      (isEnrolled(course._id) ? (
                        <button
                          className="btn btn-danger float-end"
                          onClick={() =>
                            dispatch(
                              unenroll({
                                user: currentUser._id,
                                course: course._id,
                              })
                            )
                          }
                        >
                          Unenroll
                        </button>
                      ) : (
                        <button
                          className="btn btn-success float-end"
                          onClick={() =>
                            dispatch(
                              enroll({
                                user: currentUser._id,
                                course: course._id,
                              })
                            )
                          }
                        >
                          Enroll
                        </button>
                      ))}

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
            ))}
        </Row>
      </div>
    </div>
  );
}
