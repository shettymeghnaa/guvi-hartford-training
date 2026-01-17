const arrays = [10, 20, 30, 40, 50];
const evenSquaresSum = arrays
  .filter(num => num % 2 === 0) 
  .map(num => num * num)      
  .reduce((sum, num) => sum + num, 0); 