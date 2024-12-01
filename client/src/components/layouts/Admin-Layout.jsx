import { Navigate, NavLink, Outlet } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import { FaServicestack } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { useAuth } from "../../store/auth";

export const AdminLayout = () => {
  const { user, isLoading } = useAuth();
  console.log(user);
  if (isLoading) {
    return <h1>Loading ...</h1>;
  }
  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }
  //The value of user will be empty the first time and the page will kep redirectimg to home page
  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ul>
              <li>
                <NavLink to="/admin/users">
                  <FaUserLarge />
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/contacts">
                  <IoMdContact />
                  Contacts
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/services">
                  <FaServicestack />
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/">
                  <FaHome />
                  Home
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};
