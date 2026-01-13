const arrays = [10, 20, 30, 40, 50];
const squares = arrays.map(function(num){
    return num * num;
});
console.log("Original array:", arrays);
console.log("Squared array:", squares);