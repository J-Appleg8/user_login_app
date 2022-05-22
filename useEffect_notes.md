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

# Handling Side Effects

## <span style="color:lightgreen">React Overview:</span>

---

Overview of differences between useState and useEffect

| Main Job                                  | Side Effects                  |
| ----------------------------------------- | ----------------------------- |
| Render UI & React to User Inptut          | Anything Else                 |
| Evaluate & Render JSX                     | Store Data in Browser Storage |
| Manage State & Props                      | Send Http Requests to Backend |
| React to (User) Events & Input            | Set & Manage Timers           |
| Re-review Component on State/Prop Changes |                               |

### <span style="color:turquoise">useEffect() Hook:</span>

- First Argument: a function that should be executed AFTER every component evaludation IF the specified dependencies change
- Second Argument: Dependencies of this effect - the function only runs if the dependencies change

Your side effect code goes into this function, and you specify your dependencies of your function

```javascript
useEffect(() => { ... }, [ dependencies ]);
```

### <span style="color:turquoise">useEffect() Execution:</span>

The useEffect() function is executed after every component re-evaluation (so whenever this component function is run)

- Then the useEffect will run after any component evaluation ONLY if the dependencies provided to useEffect() have changed

This also includes when the App is ran for the very first time because the dependecies are considered changed because there were no previous dependencies set up

```javascript
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
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}
```

### <span style="color:turquoise">Summary:</span>

useEffect() tells react that after every component function execution it wil re-run the useEffect() function ONLY if there have been changes to any of the dependencies provided

Benefit is being able to have one piece of code, in one place, that reruns wheneve one of the dependencies have changed

---

<br>

## <span style="color:lightgreen">Chosing Dependencies:</span>

---

- You DON'T have to provide state updating function to the dependencies because state updating functions by default are ensured by React to never change and will alway be the same across re-render cycles
- You DON'T need to add "built-in" APIs or functions like fetch(), localStorage etc (functions and features built-into the browser and hence available globally): These browser APIs / global functions are not related to the React component render cycle and they also never change
- You also DON'T need to add variables or functions you might've defined OUTSIDE of your components (e.g. if you create a new helper function in a separate file): Such functions or variables also are not created inside of a component function and hence changing them won't affect your components (components won't be re-evaluated if such variables or functions change and vice-versa)

---

<br>

## <span style="color:lightgreen">useEffect Cleanup Function:</span>

---

Whenever the useEffect functions runs, but before it runs, it will execute this cleanup function below

```javascript
const Login = props => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity');
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      );
    }, 500);
    // Whenever the useEffect functions runs, but before it runs,
    // it will execute this cleanup function
    return () => {
      // Clears the last timer before setting a new one
      clearTimeout(identifier);
      console.log('Cleanup');
    };
  }, [enteredEmail, enteredPassword]);
};
```

---

<br>

## <span style="color:lightgreen">useEffect Summary:</span>

---

### <span style="color:turquoise">No Dependencies:</span>

This effect runs after every component render cycle

- Not before
- Not during

```javascript
useEffect(() => {
  console.log('Effect running');
});
```

<br>

### <span style="color:turquoise">With Empty Array:</span>

After adding an empty array, this effect will now only execute:

- For the first time this component was mounted and rendered
- Not for any subsequent render cycles

```javascript
useEffect(() => {
  console.log('Effect running');
}, []);
```

<br>

### <span style="color:turquoise">With 1 Dependency:</span>

After adding one dependency it will now execute:

- For the first time this component was mounted and rendered
- For keystrokes in the password field only

```javascript
useEffect(() => {
  console.log('Effect running');
}, [enteredPassword]);
```

<br>

### <span style="color:turquoise">With 1 Dependency & Cleanup Function:</span>

There is also the cleanup function, which runs before this state function as a whole runs, but not before the first time it runs

```javascript
useEffect(() => {
  console.log('Effect running');
  return () => {
    console.log('Cleanup running');
  };
}, [enteredPassword]);
```

<br>

### <span style="color:turquoise">With Empty Array & Cleanup Function:</span>

Now, if we had a cleanup function with a useEffect that has an empty dependency array then the cleanup will run when the component is removed

- Example would be when when the user logs in

```javascript
useEffect(() => {
  console.log('Effect running');
  return () => {
    console.log('Cleanup running');
  };
}, []);
```
