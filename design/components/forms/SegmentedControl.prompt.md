Pill segmented switch; the canonical Normal / Faith mode control.
```jsx
<SegmentedControl label="View" value={mode} onChange={setMode} accentValue="faith"
  options={[{value:"normal",label:"Normal"},{value:"faith",label:"Faith mode"}]} />
```
Swap the whole panel on change — never leave a half-updated page.
