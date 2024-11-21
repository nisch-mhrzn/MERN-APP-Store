import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";


export const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });


  const navigate = useNavigate(); // Initialize useNavigate
  const {storetokenInLS} = useAuth();
  // const navigate = useNavigate();

  // let handle the input field value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      console.log("login form", response);

      const responseData = await response.json();
      console.log(responseData.extraDetails);

      if (response.ok) {
        alert("Login Successful");
       
        console.log('response from server',responseData);
        storetokenInLS(responseData.token);//store token in local host
        //The above function can be defined in any of the pages folder as we have already defined it in main.jsx as authprovider

        
        setUser({ email: "", password: "" });
        console.log("Navigating to home page");
        navigate("/"); // Navigate to the home page
      } else {
        alert(
          responseData.extraDetails
            ? responseData.extraDetails
            : responseData.message
        );
        console.log("invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/login.png"
                  alt="a nurse with a cute look"
                  width="400"
                  height="400"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>

                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
