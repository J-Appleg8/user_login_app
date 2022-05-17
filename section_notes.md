## React Overview:

<br>

| Main Job                                  | Side Effects                  |
| ----------------------------------------- | ----------------------------- |
| Render UI & React to User Inptut          | Anything Else                 |
| Evaluate & Render JSX                     | Store Data in Browser Storage |
| Manage State & Props                      | Send Http Requests to Backend |
| React to (User) Events & Input            | Set & Manage Timers           |
| Re-review Component on State/Prop Changes |                               |

<br>

### useEffect() Hook:

- First Argument: a function that should be executed AFTER every component evaludation IF the specified dependencies change
- Second Argument: Dependencies of this effect - the function only runs if the dependencies change

```javascript
useEffect(() => { ... }, [ dependencies ]);
```

Your side effect code goes into this function, and you specify your dependencies of your function
