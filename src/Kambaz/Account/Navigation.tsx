import { Link, useLocation } from "react-router-dom";

export default function AccountNavigation() {
  const location = useLocation();

  const links = [
    { name: "Signin", path: "/Kambaz/Account/Signin" },
    { name: "Signup", path: "/Kambaz/Account/Signup" },
    { name: "Profile", path: "/Kambaz/Account/Profile" },
  ];

  return (
    <div className="d-flex flex-column">
      {links.map(({ name, path }) => {
        const isActive = location.pathname === path;
        return (
          <div
            key={name}
            className="d-flex align-items-center mb-2"
            style={{ fontWeight: isActive ? "bold" : "normal" }}
          >
            {/* Vertical Bar */}
            <div
              style={{
                width: "4px",
                height: "20px",
                backgroundColor: isActive ? "black" : "transparent",
                marginRight: "8px",
              }}
            />
            <Link
              to={path}
              className={`text-decoration-none ${
                isActive ? "text-dark" : "text-danger"
              }`}
            >
              {name}
            </Link>
          </div>
        );
      })}
    </div>
  );
}