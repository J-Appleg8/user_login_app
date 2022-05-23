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

# Forwarding Ref's

With useImperativeHandle() & forwardRef() you can expose functionalities from a React Component to its parent component, to then use your component in the parent component through refs and trigger certain functionalities

## <span style="color:lightgreen">useImperativeHandle() & forwardRef():</span>

---

Imperatively - means not through the regular State props management not by controlling the component through State in the parent component but instead by directly calling or manipulating something in the component programatically

- first argument: a ref
- second argument: is a function that should return an object
  that object will contain all of the data you will be able to use from outside

We also now wrap the Input component function with React.forwardRef() so that we can take ref, along with props, as arguments

```javascript
// Input.js
import React, { useRef, useImperativeHandle } from 'react';

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});
```

Now with the changes above, the Input component is able to take in a ref as a prop, will expose a ref, and is now controllable or usable with refs

- But the only thing you will be able to use is what you expose in useImperativeHandle() above

```javascript
const submitHandler = event => {
  event.preventDefault();
  if (formIsValid) {
    authCtx.onLogin(emailState.value, passwordState.value);
  } else if (!emailIsValid) {
    emailInputRef.current.focus();
  } else {
    passwordInputRef.current.focus();
  }
};

return (
  <Card className={classes.login}>
    <form onSubmit={submitHandler}>
      <Input
        ref={emailInputRef}
        id="email"
        label="E-Mail"
        type="email"
        isValid={emailIsValid}
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
      />
      <Input
        ref={passwordInputRef}
        id="password"
        label="Password"
        type="password"
        isValid={passwordIsValid}
        value={passwordState.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
      />
      <div className={classes.actions}>
        <Button type="submit" className={classes.btn}>
          Login
        </Button>
      </div>
    </form>
  </Card>
);
```
