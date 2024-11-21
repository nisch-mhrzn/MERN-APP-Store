import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const[token,setToken] = useState(localStorage.getItem("token")||"");

  const storetokenInLS = (serverToken) => {
    localStorage.setItem("Token", serverToken);
    setToken(serverToken); // Update state
  };
    //logout functionality
  let isLoggedIn =!!token;//if token then true if doesnt have token then false
  console.log("ISLOGGED IN",isLoggedIn)


  const LogoutUser =() => {
   localStorage.removeItem("token");
    setToken("");
  };
  
  return (
    <AuthContext.Provider value={{isLoggedIn,storetokenInLS,LogoutUser}}>
      {/* //any page can access storetokenInLS*/}
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const authContextValue =  useContext(AuthContext) 
  if(!authContextValue){
      throw new Error('useAuth must be used within an AuthProvider')
  }
  return authContextValue;
}