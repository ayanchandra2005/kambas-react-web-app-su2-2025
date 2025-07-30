import Nav from "react-bootstrap/Nav";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function TOC() {
  const { pathname } = useLocation();

  return (
    <Nav variant="pills" id="wd-toc">
      <Nav.Item>
        <Nav.Link as={Link} to="/Labs" active={pathname === "/Labs"}>
          Labs
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/Labs/Lab1" active={pathname.includes("Lab1")}>
          Lab 1
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/Labs/Lab2" active={pathname.includes("Lab2")}>
          Lab 2
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/Labs/Lab3" active={pathname.includes("Lab3")}>
          Lab 3
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/Labs/Lab4" active={pathname.includes("Lab4")}>
          Lab 4
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/Kambaz" active={pathname.includes("Kambaz")}>
          Kambaz
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="https://github.com/ayanchandra2005" target="_blank">
          My GitHub
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}