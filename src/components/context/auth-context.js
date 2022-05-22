import React, { useState, useEffect } from 'react';

// Takes a default context - would be your app or component-wide state
// Is not a component itself, but its an object that will contain a component
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: () => {},
  onLogout: () => {},
});

// Now we are able to manage the entire login state in this AuthContextProvider component
// and which also sets up all the context
// We can now strip
export const AuthContextProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // The useEffect() function is executed after every component re-evaluation
  // so whenever this component function is run, then the useEffect will run
  // Will only run after every component evaluation if the dependencies provided
  // to useEffect() have changed
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = () => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
