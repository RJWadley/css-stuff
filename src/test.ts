import css, { cssToObject } from './index';

// Test the example from the user
console.log('Testing template literal syntax:');
const result1 = css`
   color: red;
   max-width: 100px;
   @media (width > 10px) {
      color: orange;
   }
`;
console.log(JSON.stringify(result1, null, 2));

console.log('\nTesting cssToObject function:');
const result2 = cssToObject(`
   color: red;
   max-width: 100px;
   @media (width > 10px) {
      color: orange;
   }
`);
console.log(JSON.stringify(result2, null, 2));

console.log('\nTesting more complex CSS:');
const result3 = css`
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
const result4 = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
console.log(JSON.stringify(result4, null, 2));