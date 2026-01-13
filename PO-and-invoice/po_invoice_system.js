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

function calculateAmount(type, rate, duration) {
  return rate * duration; 
}

async function runSystem() {
  console.log("PO and Invoice Management System\n");

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

  const purchaseOrder = {
    poNumber: generateNumber(),
    trainer: {
      name: trainerName,
      email: trainerEmail,
      experience: trainerExp
    },
    training: {
      courseName,
      clientName,
      startDate,
      endDate
    },
    payment: {
      type: paymentType,
      rate,
      duration
    },
    totalAmount: calculateAmount(paymentType, rate, duration)
  };

  const today = new Date();
  const eligibleDate = new Date(purchaseOrder.training.endDate);
  eligibleDate.setDate(eligibleDate.getDate() + 30);

  console.log("\n------------------------");

  if (today >= eligibleDate) {
    const invoiceDate = today;
    const dueDate = new Date(invoiceDate);
    dueDate.setDate(dueDate.getDate() + 30);

    const invoice = {
      invoiceNumber: generateNumber(),
      poNumber: purchaseOrder.poNumber,
      trainerName: purchaseOrder.trainer.name,
      courseName: purchaseOrder.training.courseName,
      totalAmount: purchaseOrder.totalAmount,
      invoiceDate,
      dueDate,
      status: today > dueDate ? "OVERDUE" : "UNPAID"
    };

    console.log("INVOICE GENERATED");
    console.log("Invoice Number :", invoice.invoiceNumber);
    console.log("PO Number      :", invoice.poNumber);
    console.log("Trainer Name   :", invoice.trainerName);
    console.log("Course Name    :", invoice.courseName);
    console.log("Total Amount   :", invoice.totalAmount);
    console.log("Invoice Date   :", invoice.invoiceDate.toDateString());
    console.log("Due Date       :", invoice.dueDate.toDateString());
    console.log("Status         :", invoice.status);

    if (invoice.status === "OVERDUE") {
      console.log("Email sent to Accounts Team: Invoice is OVERDUE");
    }

  } else {
    console.log("Invoice not yet generated");
  }

  console.log("------------------------");

  rl.close();
}

runSystem();
