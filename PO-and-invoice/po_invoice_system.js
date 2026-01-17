const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

function generateNumber() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < 3; i++) {
    code += letters[Math.floor(Math.random() * 26)];
  }
  code += Math.floor(100 + Math.random() * 900);
  return code;
}

async function runSystem() {
  console.log("PO and Invoice Management System");

  const trainerName = await ask("Trainer name: ");
  const trainerEmail = await ask("Trainer email: ");
  const trainerExp = await ask("Trainer experience: ");
  const courseName = await ask("Course name: ");
  const clientName = await ask("Client name: ");
  const startDate = await ask("Start date (YYYY-MM-DD): ");
  const endDate = await ask("End date (YYYY-MM-DD): ");
  const paymentType = await ask("Payment type (Hourly/Daily/Monthly): ");
  const rate = Number(await ask("Rate: "));
  const duration = Number(await ask("Duration: "));

  const totalAmount = rate * duration;
  const poNumber = generateNumber();

  const today = new Date();
  const eligibleDate = new Date(endDate);
  eligibleDate.setDate(eligibleDate.getDate() + 30);

  console.log("\n------------------------");

  if (today >= eligibleDate) {
    console.log("INVOICE GENERATED");
    console.log("Invoice Number :", poNumber);
    console.log("PO Number      :", poNumber);
    console.log("Trainer Name   :", trainerName);
    console.log("Course Name    :", courseName);
    console.log("Client Name    :", clientName);
    console.log("Total Amount   :", totalAmount);
    console.log("Invoice Date   :", today.toDateString());
  } else {
    console.log("Invoice not yet generated");
  }

  console.log("------------------------");

  rl.close();
}

runSystem();
