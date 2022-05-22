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

# Learning The Rules of Hooks

## <span style="color:lightgreen">Rules of Hooks:</span>

---

| #         | Rule Overview                                      |
| :-------- | -------------------------------------------------- |
| Rule #1   | Only call React Hooks in React Functions           |
|           | -- Can also use in custom Hooks                    |
| Rule #2   | Only call React Hooks at the Top Level             |
|           | -- Do not call them in any nested functions        |
|           | -- Do not call them in any block statements        |
| \*Rule #3 | Always add everything you refer to as a dependency |
|           | -- Exception to rule is State updating functions   |

\*Specifically for useEffect()
