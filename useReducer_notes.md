## <span style="color:lightgreen">useReducer(): State Management:</span>

useReducer() is another built-in React hook and it will help us with state management, similar to useState but with more capabilities and especially useful for more complex state.

<br>

### <span style="color:turquoise">Overview:</span>

Sometimes you have more complex state. For example:

If we got multiple states, multiple ways of changing it or dependencies to other states

- useState() then often becomes hard or error-prone to use and manage-- makes it easier to write bad, inefficient or buggy code
- useReducer() can be used as a replacement to useState() if you need more powerful state management
  - Does not mean that you should always use useReducer() - requires a lot of set up and extra work

<br>

### <span style="color:turquoise">Understanding useReducer():</span>

useReducer() function arguments are as follows:

```javascript
const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn);
```
