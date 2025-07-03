"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssToObject = void 0;
exports.css = css;
const toCamelCase = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
function parseCss(css) {
    const r = {};
    css = css.trim();
    let i = 0;
    while (i < css.length) {
        while (i < css.length && /\s/.test(css[i]))
            i++;
        if (i >= css.length)
            break;
        let start = i, hasColon = false, braceLevel = 0;
        while (i < css.length) {
            const c = css[i];
            if (c === '{')
                break;
            if (c === ':' && braceLevel === 0) {
                hasColon = true;
                break;
            }
            if (c === ';' && braceLevel === 0)
                break;
            if (c === '(')
                braceLevel++;
            if (c === ')')
                braceLevel--;
            i++;
        }
        const before = css.slice(start, i).trim();
        if (css[i] === '{') {
            i++;
            let blockStart = i, braceCount = 1;
            while (i < css.length && braceCount > 0) {
                if (css[i] === '{')
                    braceCount++;
                else if (css[i] === '}')
                    braceCount--;
                i++;
            }
            r[before] = parseCss(css.slice(blockStart, i - 1));
        }
        else if (hasColon) {
            i++;
            let valueStart = i;
            while (i < css.length && css[i] !== ';')
                i++;
            const value = css.slice(valueStart, i).trim();
            if (before && value)
                r[toCamelCase(before)] = value;
            if (css[i] === ';')
                i++;
        }
        else {
            i++;
        }
    }
    return r;
}
function css(template, ...substitutions) {
    let s = '';
    for (let i = 0; i < template.length; i++) {
        s += template[i];
        if (i < substitutions.length)
            s += String(substitutions[i]);
    }
    return parseCss(s);
}
const cssToObject = (cssString) => parseCss(cssString);
exports.cssToObject = cssToObject;
exports.default = css;
//# sourceMappingURL=index.js.map