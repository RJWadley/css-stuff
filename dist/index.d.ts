export type CSSObject = {
    [key: string]: string | CSSObject;
};
export declare function css(template: TemplateStringsArray, ...substitutions: any[]): CSSObject;
export declare const cssToObject: (cssString: string) => CSSObject;
export default css;
//# sourceMappingURL=index.d.ts.map