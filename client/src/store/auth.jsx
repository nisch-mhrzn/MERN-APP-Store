import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const[token,setToken] = useState(localStorage.getItem("token")||"");
    const [user,setUser] = useState("")
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
  const userAuthentication =async() => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/user",{
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      if(response.ok){
        const data =await response.json()
        console.log("USer data",data.userData)
        setUser(data);
      }
    } catch (error) {
      console.error(error);
      
    }
  
  }
  //jwt authentication -to get currently logged in user adat
  useEffect(() => {
    userAuthentication()
  },[]);
  

  return (
    <AuthContext.Provider value={{isLoggedIn,storetokenInLS,LogoutUser,user}}>
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