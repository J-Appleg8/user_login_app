<style>
th, thead {
    border-top:1pt solid;
    border-bottom: 2px solid;
    border-left: none;
    border-right: none;
}
td {
    border-top: 1px solid;
    border-bottom: 1px solid;
    border-left: 1px solid;
    border-right: 1px solid;
}
</style>

# React Context (Context API)

## <span style="color:lightgreen">Providing:</span>

---

createContext() Takes a default context - would be your app or component-wide state.

- Is not a component itself, but its an object that will contain a component

```javascript
// auth-context.js
import React from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
});
```

If we then import our AuthContext object and use it as a wrapper for our App level component, all of the components and children components will have access to AuthContext

```javascript
// App.js
import React, { useState, useEffect } from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/context/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}
```

Now we have the second part, which is the listening part. To get access to our values in the context object, we can listen in two ways:

- By using AuthContext.Consumer
- By using a React hook

---

<br>

## <span style="color:lightgreen">Listening: AuthContext.Consumer</span>

---

Consumer takes a child, which should be a function that returns the JSX code for the component, and as its argument you'll get your context data from AuthContext

```javascript
// Navigation.js
const Navigation = props => {
  return (
    <AuthContext.Consumer>
      {ctx => {
        return ();
      }}
    </AuthContext.Consumer>
  );
};
```

To avoid having your application crash, you can also add a value prop to your AuthContext.Provider and pass your object into it which now allows you to change that object, for example through State in the App component

- Now, whenever it changes, the new value will be passed down to all listening components

```javascript
// App.js
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn }}>
      <MainHeader
        isAuthenticated={isLoggedIn} // Can now remove
        onLogout={logoutHandler}
      />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}
```

Because we pass the App() component state variable isLoggedIn as a value for AuthContext.Provider, we can then remove `isAuthenticated={isLoggedIn}` as a prop from MainHeader in the App() component (above).

We can also remove `isLoggedIn={props.isAuthenticated}` as a prop from Navigation in the MainHeader component (below)

```javascript
// MainHeader.js
const MainHeader = props => {
  return (
    <header className={classes['main-header']}>
      <h1>A Typical Page</h1>
      <Navigation
        isLoggedIn={props.isAuthenticated} // Can now remove
        onLogout={props.onLogout}
      />
    </header>
  );
};
```

And now in the Navigation component we can reference ctx.isLoggedIn instead of props.isLoggedIn

```javascript
// Navigation.js
const Navigation = props => {
  return (
    <AuthContext.Consumer>
      {ctx => {
        return (
          <nav className={classes.nav}>
            <ul>
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Users</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Admin</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <button onClick={props.onLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        );
      }}
    </AuthContext.Consumer>
  );
};
```

---

<br>

## <span style="color:lightgreen">Listening: useContext()</span>

---

The React useContext() hook takes in a context pointer as a parameter and returns the context value back

```javascript
// Navigation.js
const Navigation = props => {
  const ctx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};
```

---

<br>

## <span style="color:lightgreen">Making Context Dynamic</span>

---

We are able to not only pass data to our components through context, but can also pass functions

For Example: We can add `onLogout: logoutHandler` into the context object in value property of AuthContext.Provider

- Now every listening component will be able to utilize logoutHandler, simply through the onLogout context value

```javascript
// App.js
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
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
        onLogout: logoutHandler,
      }}
    >
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}
```

---

<br>

## <span style="color:lightgreen">Building Custom Context Component</span>

---

One example of creating a custom Context component would be to move all of the Auth state management code from the App component to a new AuthContextProvider component

- Now we are able to manage the entire login state in this AuthContextProvider component, which also sets up all the context as well

```javascript
// auth-context.js
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: () => {},
  onLogout: () => {},
});

export const AuthContextProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
```

Now we can wrap our App component with AuthContextProvider in index.js so that it has access to all of the AuthContext created and maintained in our auth-context.js file

- We now have a new central place for the Auth state management that has a dedicated context component

```javascript
// index.js
import { AuthContextProvider } from './components/context/auth-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
```

After moving all of that state management code, we have a much more focused and leaner App component that can now focus on rendering something onto the screen

```javascript
// App.js
function App() {
  const ctx = useContext(AuthContext);

  return (
    <>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </>
  );
}
```

---

<br>

## <span style="color:lightgreen">Context Limitations</span>

---

Context is great for app-wide or component-wide state but it is not a replacement for component configuration

- Props: used for configuration
- Context: used for state management across components or across the entire app

| React Context Limitations                                            |
| -------------------------------------------------------------------- |
| Is NOT optimized for high frequency changes                          |
| Should NOT be used to replace ALL component communications and props |
