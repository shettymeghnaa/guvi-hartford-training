function sumOfSquaresOfResults(arr) {
    var sum = 0;
    for (var i = 2; i < arr.length; i += 3) {
        sum += arr[i] * arr[i];
    }
    return sum;
}
// Example
var arr = [2, 10, 15, 3, 17, 4, 5, 7];
console.log(sumOfSquaresOfResults(arr));
