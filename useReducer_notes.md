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

# Using Reducers

## <span style="color:lightgreen">useReducer(): State Management:</span>

---

useReducer() is another built-in React hook and it will help us with state management, similar to useState but with more capabilities and especially useful for more complex state.

### <span style="color:turquoise">Overview:</span>

Sometimes you have more complex state. For example:

If we got multiple states, multiple ways of changing it or dependencies to other states

- useState() then often becomes hard or error-prone to use and manage-- makes it easier to write bad, inefficient or buggy code
- useReducer() can be used as a replacement to useState() if you need more powerful state management
  - Does not mean that you should always use useReducer() - requires a lot of set up and extra work

### <span style="color:turquoise">Understanding useReducer():</span>

useReducer() function arguments are as follows:

```javascript
const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn);
```

The two values you are getting are:

- state: The state snapshot used in the component re-render/re-evaludation cycle
- dispatchFn: A function that can be used to dispatch a new action (i.e. trigger an update of the state)
  - Instead of setting a new state value, you will dispatch an action that will be consumed by reducerFn
- reducerFn: will be a function that is triggered automatically once an action is dispatched (via dispatchFn()), it receives the latest state snapshot and should return the new, updated state
  - React will call this reducer function whenever a new action is dispatched, then it gets the last state snapshot managed by React, and it gets the action attatched
  - It should then return a new updated state
- initialState: Sets the initial state
- initFn: Sets teh initial function

---

<br>

## <span style="color:lightgreen">Adding Nested Properties As Dependencies To useEffect:</span>

---

In the previous lecture, we used object destructuring to add object properties as dependencies to useEffect().

```javascript
const { someProperty } = someObject;
useEffect(() => {
  // code that only uses someProperty ...
}, [someProperty]);
```

This is a very common pattern and approach, which is why I typically use it and why I show it here (I will keep on using it throughout the course).

I just want to point out, that they key thing is NOT that we use destructuring but that we pass specific properties instead of the entire object as a dependency.

We could also write this code and it would work in the same way.

```javascript
useEffect(() => {
  // code that only uses someProperty ...
}, [someObject.someProperty]);
```

This works just fine as well!

But you should avoid this code:

```javascript
useEffect(() => {
  // code that only uses someProperty ...
}, [someObject]);
```

Why?

Because now the effect function would re-run whenever ANY property of someObject changes - not just the one property (someProperty in the above example) our effect might depend on.

---

<br>

## <span style="color:lightgreen">useReducer vs useState for State Management:</span>

---

Generally, you'll know when you need useReducer() (When using useState() becomes cumbersome or you're getting a lot of bugs/unintended behaviors)

| useState()                                  | useReducer()                      |
| ------------------------------------------- | --------------------------------- |
| The main state management "tool"            | Need "more power"                 |
| For independent pieces of state/data        | Have related pieces of state/data |
| State updates are easy/limited to few kinds | Have more complex state updates   |
