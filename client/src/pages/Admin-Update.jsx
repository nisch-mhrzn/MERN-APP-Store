import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AdminUpdate = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const params = useParams();
  console.log("Captured params:", params);

  const { authorizationToken } = useAuth();

  //get single user data
  const getSingleUserData = async () => {
    try {

      const response = await fetch(
        `http://localhost:5000/api/admin/users/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      const data = await response.json();
      console.log(`users single data:${data}`);
      setData(data);
    } catch (error) {
      console.log("Error in deleting user:", error);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  // to update the data dynamically
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json", //beacuse in POST we are using this
            Authorization: authorizationToken,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        toast.success("Updated successfully");
      } else {
        toast.error("Not Updated");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="section-contact">
      <div className="contact-content container">
        <h1 className="main-heading">Update User</h1>

        <section className="section-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={data.username}
                onChange={handleInput}
                autoCapitalize="off"
                required
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={data.email}
                onChange={handleInput}
                autoCapitalize="off"
                required
              />
            </div>

            <div>
              <label htmlFor="phone">Phone</label>
              <input
                type="phone"
                name="phone"
                id="phone"
                value={data.phone}
                onChange={handleInput}
                autoCapitalize="off"
                required
              />
            </div>

            <div>
              <button type="submit">Update</button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};
