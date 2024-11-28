import { NavLink, Outlet } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import { FaServicestack } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";

export const AdminLayout = () => {
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
              <li><NavLink to="/admin/services">
                <FaServicestack />
                Services
                </NavLink>
              </li>
              <li><NavLink to="/">
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
