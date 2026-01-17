function result(regularExams, assignments, finalScore, callback) {
  const totalScore = regularExams + assignments + finalScore;
  callback(totalScore);
}

function checkResult(score) {
  if (score >= 40) {
    console.log("Pass");
  } else {
    console.log("Fail");
  }
}

// Usage example:
result(15, 10, 20, checkResult);
