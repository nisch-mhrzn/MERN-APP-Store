import { createContext, useContext } from "react";

export const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const storetokenInLS = (serverToken) => {
    return localStorage.setItem("Token", serverToken);
  };
  return (
    <AuthContext.Provider value={{storetokenInLS}}>
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