// Import React and the Hooks we need here 
import React, { useState, useEffect, useContext } from "react";
// Import the Util function we created to handle the reading from the local storage 
import getAuth from '../util/auth';
// Create a context object  
const AuthContext = React.createContext();
// Create a custom hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
}

// Create a provider component  
export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [customerId, setCustomerId] = useState(null);


  

  useEffect(() => {
    const loadAuth = async () => {
      const storedEmployee = await getAuth(); // await the async function
      if (storedEmployee?.employee_token) {
        setIsLogged(true);
        setEmployee(storedEmployee); 
        setCustomerId(storedEmployee.customer_id); // Set customer ID if available
        // <-- Header will get this immediately
        if (storedEmployee.employee_role === 3) setIsAdmin(true);
      }
    };
    loadAuth();
  }, []); 

  
  

// logout function to clear the authentication state and local storage
      const logout = () => {
      setIsLogged(false);
      setIsAdmin(false);
      setEmployee(null);
    setCustomerId(null);

      localStorage.removeItem("employee"); // Ensure you clear local storage if it's used
    };

  const value = {
    isLogged,
    isAdmin,
    setIsAdmin,
    setIsLogged,
    employee,
    setEmployee,
    logout,
    customerId,
    setCustomerId
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

