export type CSSObject = {
  [key: string]: string | CSSObject;
};

const toCamelCase = (s: string) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

function mergeCssObjects(target: CSSObject, source: CSSObject) {
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (
        typeof source[key] === 'object' &&
        source[key] !== null &&
        !Array.isArray(source[key]) &&
        target[key] &&
        typeof target[key] === 'object'
      ) {
        target[key] = mergeCssObjects(target[key] as CSSObject, source[key] as CSSObject);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}

function parseCss(css: string): CSSObject {
  const r: CSSObject = {};
  css = css.replace(/\/\*[\s\S]*?\*\//g, '').trim();
  
  let i = 0;
  while (i < css.length) {
    while (i < css.length && /\s/.test(css[i])) i++;
    if (i >= css.length) break;
    
    let start = i, hasColon = false, braceLevel = 0;
    
    while (i < css.length) {
      const c = css[i];
      if (c === '{') break;
      if (c === ':' && braceLevel === 0 && /\s/.test(css[i+1] ?? '')) { hasColon = true; break; }
      if (c === ';' && braceLevel === 0) break;
      if (c === '(') braceLevel++;
      if (c === ')') braceLevel--;
      i++;
    }
    
    const before = css.slice(start, i).trim();
    
    if (css[i] === '{') {
      i++;
      let blockStart = i, braceCount = 1;
      while (i < css.length && braceCount > 0) {
        if (css[i] === '{') braceCount++;
        else if (css[i] === '}') braceCount--;
        i++;
      }
      r[before] = parseCss(css.slice(blockStart, i - 1));
    } else if (hasColon) {
      i++;
      let valueStart = i;
      let braceLevel = 0, inString = false;
      while (i < css.length) {
        if (css[i] === '"') inString = !inString;
        else if (css[i] === '(' && !inString) braceLevel++;
        else if (css[i] === ')' && !inString) braceLevel--;
        else if (css[i] === ';' && braceLevel === 0 && !inString) break;
        i++;
      }
      const value = css.slice(valueStart, i).trim();
      if (before && value) r[toCamelCase(before)] = value;
      if (css[i] === ';') i++;
    } else {
      i++;
    }
  }
  
  return r;
}

export function css(template: TemplateStringsArray, ...substitutions: any[]): CSSObject {
  let s = template[0];
  let result: CSSObject = {};
  for (let i = 0; i < substitutions.length; i++) {
    const sub = substitutions[i];
    if (typeof sub === 'object' && sub !== null) {
      const o = parseCss(s);
      result = mergeCssObjects(result, o);
      const lastKey = Object.keys(result).pop();
      if (lastKey) {
        result[lastKey] = mergeCssObjects(result[lastKey] as CSSObject, sub);
      }
      s = '';
    } else {
      s += String(sub);
    }
    s += template[i + 1];
  }
  result = mergeCssObjects(result, parseCss(s));
  return result;
}

export const cssToObject = (cssString: string) => parseCss(cssString);

export default css;