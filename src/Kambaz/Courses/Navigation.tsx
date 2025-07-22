import { Link, useLocation, useParams } from "react-router-dom";

export default function CourseNavigation() {
  const { cid } = useParams();
  const location = useLocation();

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const isActive = location.pathname.includes(`/${link}`);
        const id = `wd-course-${link.toLowerCase()}-link`;

        return (
          <Link
            key={link}
            id={id}
            to={`/Kambaz/Courses/${cid}/${link}`}
            className={`list-group-item border border-0 ${
              isActive ? "active" : "text-danger"
            }`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
