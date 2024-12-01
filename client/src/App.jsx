import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";

import { Register } from "./pages/Register";
import { Login } from "./pages/Login";

import { Navbar } from "./components/Navbar";
import { Logout } from "./pages/Logout";
import { Service } from "./pages/Service";
import { AdminLayout } from "./components/layouts/Admin-Layout";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminContacts } from "./pages/Admin-Contacts";
import { AdminUpdate } from "./pages/Admin-Update";
import { Error } from "./pages/Error";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error/>} />
        <Route path="/admin" element={<AdminLayout/>}>
        <Route path="users" element={<AdminUsers/>}/>
        <Route path="contacts" element={<AdminContacts/>}/>
        <Route path="user/:id/edit" element={<AdminUpdate />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
