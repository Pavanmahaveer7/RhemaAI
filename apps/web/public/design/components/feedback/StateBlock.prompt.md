The required data-state block; every data screen shows loading, empty, error (sentence + retry) and unavailable.
```jsx
<StateBlock kind="loading" />
<StateBlock kind="empty" message="No matching terms in the lexicon." />
<StateBlock kind="error" message="The lexicon service is down right now." onRetry={retry} />
<StateBlock kind="uncovered" compact message="Not in the lexicon yet." />
```
`uncovered` is for sections the lexicon does not cover — say so, never hide the section.
