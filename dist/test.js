"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importStar(require("./index"));
// Test the example from the user
console.log('Testing template literal syntax:');
const result1 = (0, index_1.default) `
   color: red;
   max-width: 100px;
   @media (width > 10px) {
      color: orange;
   }
`;
console.log(JSON.stringify(result1, null, 2));
console.log('\nTesting cssToObject function:');
const result2 = (0, index_1.cssToObject)(`
   color: red;
   max-width: 100px;
   @media (width > 10px) {
      color: orange;
   }
`);
console.log(JSON.stringify(result2, null, 2));
console.log('\nTesting more complex CSS:');
const result3 = (0, index_1.default) `
  font-size: 14px;
  background-color: #fff;
  border-radius: 4px;
  
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 8px;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
console.log(JSON.stringify(result3, null, 2));
console.log('\nTesting simple CSS without nesting:');
const result4 = (0, index_1.default) `
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
console.log(JSON.stringify(result4, null, 2));
//# sourceMappingURL=test.js.map