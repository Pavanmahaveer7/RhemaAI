Heroicons v2 icon (Outline, 1.5 stroke) that inherits text colour; use for every icon in the system.
```jsx
<Icon name="search" size={18} />
<Icon name="waypoints" weight={selected ? "fill" : "regular"} />
```
Names are short semantic keys mapped to Heroicons files inside Icon.jsx. Add a key to MAP before using a new icon; an unmapped key renders a neutral circle. Sizes 16/18/20/24. Solid (`weight="fill"`) is only for the selected tab or nav item.
