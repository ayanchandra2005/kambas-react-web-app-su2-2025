import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const location = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // build the nav list
  const links: { name: string; path: string }[] = currentUser
    ? [{ name: "Profile", path: "/Kambaz/Account/Profile" }]
    : [
        { name: "Signin", path: "/Kambaz/Account/Signin" },
        { name: "Signup", path: "/Kambaz/Account/Signup" },
      ];

  // only admins see "Users"
  if (currentUser && currentUser.role === "ADMIN") {
    links.push({ name: "Users", path: "/Kambaz/Account/Users" });
  }

  return (
    <div className="d-flex flex-column" id="wd-account-navigation">
      {links.map(({ name, path }) => {
        const isActive = location.pathname === path;
        return (
          <div
            key={name}
            className="d-flex align-items-center mb-2"
            style={{ fontWeight: isActive ? "bold" : "normal" }}
          >
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