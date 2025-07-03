# CSS to Object Utility

A lightweight TypeScript utility that converts CSS strings to JavaScript objects. **Size: 727 bytes gzipped**.

## Features

- ✅ Converts kebab-case CSS properties to camelCase
- ✅ Handles nested rules (@media, @keyframes, etc.)
- ✅ Template literal support
- ✅ No dependencies
- ✅ TypeScript support
- ✅ Under 1KB gzipped

## Usage

### Template Literal Syntax

```typescript
import css from 'css-to-object';

const styles = css`
  color: red;
  max-width: 100px;
  @media (width > 10px) {
    color: orange;
  }
`;
```

### Function Syntax

```typescript
import { cssToObject } from 'css-to-object';

const styles = cssToObject(`
  color: red;
  max-width: 100px;
  @media (width > 10px) {
    color: orange;
  }
`);
```

### Output

Both examples produce:

```javascript
{
  color: "red",
  maxWidth: "100px",
  "@media (width > 10px)": {
    color: "orange"
  }
}
```

## API

- `css` - Template literal tag function
- `cssToObject(cssString: string)` - Convert CSS string to object
- `CSSObject` - TypeScript type for the result

## Limitations

- Not fully CSS spec compliant (prioritizes size over completeness)
- Case sensitive (CSS is case insensitive but this utility is not)
- Basic error handling (malformed CSS may produce unexpected results)

## Building

```bash
npm install
npm run build
```