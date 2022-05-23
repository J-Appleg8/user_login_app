import React, { useRef, useImperativeHandle } from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  // This way we are able to call focus or activate on your input component
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };
  // Imperatively - means not through the regular State props management
  // not by controlling the component through State in the parent component
  // but instead by directly calling or manipulating something in the component
  // programatically

  // first argument
  // second argument is a function that should return an object
  // that object will contain all of the data you will be able to use from outside
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

export default Input;
