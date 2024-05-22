/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// provider component
export function AuthProvider({ children }) {
  // Initialize isAuthenticated state with the value from localStorage, default to false if not found
  const intital = JSON.parse(localStorage.getItem("isAuthenticated")) || false;
  const [isAuthenticated, setAuthenticated] = useState(intital);

  // Save isAuthenticated state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  return (
    //  Wrap application with the provider
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

// Step 4: Create a custom hook to use the context
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  // Use the useContext hook to access the AuthContext
  const context = useContext(AuthContext);

  // Throw an error if the hook is used outside of the AuthProvider
  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");
  else return context;
};
