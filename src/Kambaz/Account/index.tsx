import { useSelector } from "react-redux";
import AccountNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import Signin from "./Signin";
import Profile from "./Profile";
import Signup from "./Signup";
import Users from "./Users";
import PeopleDetails from "../Courses/People/Details";

export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-account-screen">
      <table>
        <tbody>
          <tr>
            <td valign="top">
              <AccountNavigation />
            </td>
            <td valign="top">
              <Routes>
                <Route
                  path=""
                  element={<Navigate to={currentUser ? "Profile" : "Signin"} />}
                />
                <Route path="Signin" element={<Signin />} />
                <Route path="Signup" element={<Signup />} />
                <Route path="Profile" element={<Profile />} />

                {/* Nested users routes */}
                <Route path="Users/*" element={<Users />}>
                  <Route path=":uid" element={<PeopleDetails />} />
                </Route>
              </Routes>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}