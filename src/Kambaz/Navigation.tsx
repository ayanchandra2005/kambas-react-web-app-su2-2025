import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

export default function KambazNavigation() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.startsWith(path);
  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      {/* Northeastern Logo */}
      <ListGroup.Item
        id="wd-neu-link"
        target="_blank"
        action
        href="https://www.northeastern.edu/"
        className="bg-black border-0 text-center"
      >
        <img src="/images/NU_CMYK_Notched-N_wordmark_RW.png" width="75px" />
      </ListGroup.Item>

      {/* Account */}
      <ListGroup.Item
        to="/Kambaz/Account"
        as={Link}
        className="text-center border-0 bg-black text-white"
      >
        <FaRegCircleUser className="fs-1 text text-white" />
        <br />
        Account
      </ListGroup.Item>

      {/* Dashboard */}
      <ListGroup.Item
        to="/Kambaz/Dashboard"
        as={Link}
        className={`text-center border-0 ${
          isActive("/Kambaz/Dashboard")
            ? "bg-white text-danger"
            : "bg-black text-white"
        }`}
      >
        <AiOutlineDashboard
          className="fs-1 text-danger" />
        <br />
        Dashboard
      </ListGroup.Item>

      {/* Courses */}
      <ListGroup.Item
        to="/Kambaz/Courses"
        as={Link}
        className={`text-center border-0 ${
          isActive("/Kambaz/Courses")
            ? "bg-white text-danger"
            : "bg-black text-white"
        }`}
      >
        <LiaBookSolid className="fs-1 text-danger" />
        <br />
        Courses
      </ListGroup.Item>

      {/* Calendar */}
      <ListGroup.Item
        to="/Kambaz/Calendar"
        as={Link}
        className={`text-center border-0 ${
          isActive("/Kambaz/Calendar")
            ? "bg-white text-danger"
            : "bg-black text-white"
        }`}
      >
        <IoCalendarOutline className="fs-1 text-danger" />
        <br />
        Calendar
      </ListGroup.Item>

      {/* Inbox */}
      <ListGroup.Item
        to="/Kambaz/Inbox"
        as={Link}
        className={`text-center border-0 ${
          isActive("/Kambaz/Inbox")
            ? "bg-white text-danger"
            : "bg-black text-white"
        }`}
      >
        <FaInbox className="fs-1 text-danger" />
        <br />
        Inbox
      </ListGroup.Item>

      {/* Labs */}
      <ListGroup.Item
        to="/Labs"
        as={Link}
        className={`text-center border-0 ${
          isActive("/Labs")
            ? "bg-white text-danger"
            : "bg-black text-white"
        }`}
      >
        <LiaCogSolid className="fs-1 text-danger" />
        <br />
        Labs
      </ListGroup.Item>
    </ListGroup>
  );
}
