import React, { useState, useEffect } from 'react';
import Card from './src/components/UI/Card/Card';
import classes from './Login.module.css';
import Button from './src/components/UI/Button/Button';

const Login = props => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  ////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    console.log('Effect running');

    return () => {
      console.log('Effect cleanup');
    };
  }, [enteredPassword]);

  // After every component function execution, it will re-run this useEffect()
  // function only if there have been changes to any of the dependencies
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity');
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      );
    }, 500);
    // When this useEffect() runs, it will execute this cleanup function first
    // Clears the last timer before setting a new one
    return () => {
      clearTimeout(identifier);
      console.log('Effect Cleanup');
    };
  }, [enteredEmail, enteredPassword]);

  ////////////////////////////////////////////////////////////////////////////////
  const emailChangeHandler = event => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = event => {
    setEnteredPassword(event.target.value);
  };

  // Currently deriving one state from the value of another state
  // Which generally should not be done
  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = event => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  ////////////////////////////////////////////////////////////////////////////////
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
