import { describe, it, expect } from 'vitest';
import { css, cssToObject } from './index';

describe('css-to-object', () => {
  it('should parse a simple rule', () => {
    const result = cssToObject('color: red;');
    expect(result).toEqual({ color: 'red' });
  });

  it('should parse multiple rules', () => {
    const result = cssToObject('color: red; background-color: blue;');
    expect(result).toEqual({ color: 'red', backgroundColor: 'blue' });
  });

  it('should handle different data types in template literals', () => {
    const color = 'red';
    const size = 12;
    const result = css`
      color: ${color};
      font-size: ${size}px;
    `;
    expect(result).toEqual({ color: 'red', fontSize: '12px' });
  });

  it('should parse a nested rule', () => {
    const result = cssToObject('a { color: red; }');
    expect(result).toEqual({ a: { color: 'red' } });
  });

  it('should parse multiple nested rules', () => {
    const result = cssToObject('a { color: red; } b { color: blue; }');
    expect(result).toEqual({ a: { color: 'red' }, b: { color: 'blue' } });
  });

  it('should parse a deeply nested rule', () => {
    const result = cssToObject('a { b { c { color: red; } } }');
    expect(result).toEqual({ a: { b: { c: { color: 'red' } } } });
  });

  it('should handle CSS variables', () => {
    const result = cssToObject('color: var(--custom-property);');
    expect(result).toEqual({ color: 'var(--custom-property)' });
  });

  it('should handle CSS-wide keywords', () => {
    const result = cssToObject('color: initial; border: inherit; outline: unset;');
    expect(result).toEqual({ color: 'initial', border: 'inherit', outline: 'unset' });
  });

  it('should handle CSS strings', () => {
    const result = cssToObject('content: "anything goes";');
    expect(result).toEqual({ content: '"anything goes"' });
  });

  it('should handle CSS comments', () => {
    const result = cssToObject('/* comment */ color: red; /* another comment */');
    expect(result).toEqual({ color: 'red' });
  });

  it('should handle empty functions', () => {
    const result = cssToObject('color: var();');
    expect(result).toEqual({ color: 'var()' });
  });

  it('should handle url() functions', () => {
    const result = cssToObject('background-image: url(anything/goes.jpg);');
    expect(result).toEqual({ backgroundImage: 'url(anything/goes.jpg)' });
  });

  it('should handle data URIs in url() functions', () => {
    const result = cssToObject('background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=);');
    expect(result).toEqual({ backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=)' });
  });

  it('should handle vendor prefixes', () => {
    const result = cssToObject('@-webkit-keyframes name { from { top: 0; } to { top: 10px; } }');
    expect(result).toEqual({ '@-webkit-keyframes name': { from: { top: '0' }, to: { top: '10px' } } });
  });

  it('should handle case sensitivity', () => {
    const result = cssToObject('@KEYFRAMES name { from { TOP: 0; } to { TOP: 10px; } }');
    expect(result).toEqual({ '@KEYFRAMES name': { from: { 'TOP': '0' }, to: { 'TOP': '10px' } } });
  });

  it('should handle pseudo-classes combined with pseudo-elements', () => {
    const result = cssToObject('a:hover::before { content: " "; }');
    expect(result).toEqual({ 'a:hover::before': { content: '" "' } });
  });

  it('should handle nesting with &', () => {
    const result = cssToObject('a { &:hover { color: red; } }');
    expect(result).toEqual({ a: { '&:hover': { color: 'red' } } });
  });

  it('should handle whitespace and punctuation variations', () => {
    const result = cssToObject('color: rgb(0,0,0); background: rgb(0, 0, 0);');
    expect(result).toEqual({ color: 'rgb(0,0,0)', background: 'rgb(0, 0, 0)' });
  });

  describe('gracefully handles malformed CSS', () => {
    it('should handle a missing semicolon', () => {
      const result = cssToObject('color: red');
      expect(result).toEqual({ color: 'red' });
    });

    it('should handle a missing closing brace', () => {
      const result = cssToObject('a { color: red; ');
      expect(result).toEqual({ a: { color: 'red' } });
    });

    it('should handle an extra closing brace', () => {
      const result = cssToObject('a { color: red; }}');
      expect(result).toEqual({ a: { color: 'red' } });
    });

    it('should handle a missing value', () => {
      const result = cssToObject('color:;');
      expect(result).toEqual({});
    });
  });

  it('should handle a comment before a rule', () => {
    const result = cssToObject('/* comment */ background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=);');
    expect(result).toEqual({ backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=)' });
  });

  describe('complex selectors', () => {
    it('should handle comma-separated selectors', () => {
      const result = cssToObject('h1, h2, h3 { color: green; }');
      expect(result).toEqual({ 'h1, h2, h3': { color: 'green' } });
    });

    it('should handle combinator selectors', () => {
      const result = cssToObject('div > p { font-weight: bold; }');
      expect(result).toEqual({ 'div > p': { fontWeight: 'bold' } });
    });

    it('should handle attribute selectors', () => {
      const result = cssToObject('input[type="submit"] { background-color: blue; }');
      expect(result).toEqual({ 'input[type="submit"]': { backgroundColor: 'blue' } });
    });
  });

  describe('at-rules', () => {
    it('should handle media queries', () => {
      const result = cssToObject('@media (min-width: 768px) { div { flex-direction: row; } }');
      expect(result).toEqual({
        '@media (min-width: 768px)': {
          div: {
            flexDirection: 'row'
          }
        }
      });
    });

    it('should handle at-rules without a body', () => {
      const result = cssToObject('@charset "UTF-8";');
      expect(result).toEqual({ '@charset': '"UTF-8"' });
    });
  });

  describe('CSS values and properties', () => {
    it('should handle !important', () => {
      const result = cssToObject('color: blue !important;');
      expect(result).toEqual({ color: 'blue !important' });
    });

    it('should camel-case vendor-prefixed properties', () => {
      const result = cssToObject('-webkit-appearance: none;');
      expect(result).toEqual({ WebkitAppearance: 'none' });
    });

    it('should handle values with spaces or commas', () => {
      const result = cssToObject('transform: translate(10px, 20px) scale(1.5);');
      expect(result).toEqual({ transform: 'translate(10px, 20px) scale(1.5)' });
    });
  });

  describe('comments and whitespace', () => {
    it('should handle comments inside selectors or values', () => {
      const result = cssToObject('a/* ignore this */:hover { color: /* or this */ red; }');
      expect(result).toEqual({ 'a:hover': { color: 'red' } });
    });

    it('should handle extensive whitespace', () => {
      const result = cssToObject(`
        a {
          color: red;
        }
      `);
      expect(result).toEqual({ a: { color: 'red' } });
    });
  });

  describe('more malformed CSS', () => {
    it('should handle empty or whitespace-only input', () => {
      expect(cssToObject('')).toEqual({});
      expect(cssToObject('  \n\t  ')).toEqual({});
    });

    it('should handle property without a colon', () => {
      const result = cssToObject('a { color red }');
      expect(result).toEqual({ a: {} });
    });
  });

  describe('css template literal', () => {
    it('should handle nesting', () => {
      const nested = {
        '&:hover': {
          color: 'blue'
        }
      };
      const result = css`
        a {
          color: red;
          ${nested}
        }
      `;
      expect(result).toEqual({
        a: {
          color: 'red',
          '&:hover': {
            color: 'blue'
          }
        }
      });
    });
  });

  describe('strings with special characters', () => {
    it('should handle strings with special characters in content property', () => {
      const result = cssToObject('content: "a:b;c{d}e";');
      expect(result).toEqual({ content: '"a:b;c{d}e"' });
    });

    it('should handle strings with special characters in url() function', () => {
      const result = cssToObject('background-image: url("a:b;c{d}e.jpg");');
      expect(result).toEqual({ backgroundImage: 'url("a:b;c{d}e.jpg")' });
    });
  });
});
