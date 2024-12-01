import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [isLoading,setIsLoading]= useState(true);
  const storetokenInLS = (serverToken) => {
    setToken(serverToken); // Update state so you do not need to login to refresh the page
    localStorage.setItem("token", serverToken);
  };
  const authorizationToken =`Bearer ${token}`;
  //logout functionality
  let isLoggedIn = !!token; //if token then true if doesnt have token then false
  console.log("ISLOGGED IN", isLoggedIn);

  const LogoutUser = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };
  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("User data", data.userData);
        setUser(data.userData);
        setIsLoading(false);//UNTIL DATA IS NOT FETCHED STAY IN LOADING STATE 
      }
      else{
        console.log("Error Fetching user data");
        setIsLoading(false);

      }
    } catch (error) {
      console.error("User authentication error", error);
    }
  };
  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data/service", {
        method: "GET",
      });
      if (response.ok) {
        const services = await response.json();
        console.log("Services:", services); // Check if this outputs the expected data
        setServices(services.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //jwt authentication -to get currently logged in user adat
  useEffect(() => {
    userAuthentication();
    getServices();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, storetokenInLS, LogoutUser, user, services,authorizationToken ,isLoading}}
    >
      {/* //any page can access storetokenInLS*/}
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};
