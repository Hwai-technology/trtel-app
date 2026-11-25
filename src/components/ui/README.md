
### React Native Web – TextInput Focus Outline

When using TextInput on Web, the browser may display a default black focus outline.

To remove it and use the custom container border instead, add:

```tsx
outlineWidth: 0,
outlineStyle: "none" as any,
```

The `as any` is needed because React Native's TypeScript definitions may not accept `"none"` for `outlineStyle`, although the browser supports it.

Keep the focus border on the outer container.
