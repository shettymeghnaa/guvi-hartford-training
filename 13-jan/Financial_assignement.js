// Base Financial Account Class
class FinancialAccount {
    constructor(accountNumber, accountHolder, balance = 0) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this._balance = balance; // Encapsulated with underscore convention
        this.transactions = [];
        this.createdDate = new Date();
    }

    // Getter for balance (encapsulation)
    get balance() {
        return this._balance;
    }

    // Method to deposit money
    deposit(amount, description = "Deposit") {
        if (amount <= 0) {
            throw new Error("Deposit amount must be positive");
        }
        this._balance += amount;
        this.recordTransaction(amount, 'credit', description);
        return this._balance;
    }

    // Method to withdraw money
    withdraw(amount, description = "Withdrawal") {
        if (amount <= 0) {
            throw new Error("Withdrawal amount must be positive");
        }
        if (amount > this._balance) {
            throw new Error("Insufficient funds");
        }
        this._balance -= amount;
        this.recordTransaction(amount, 'debit', description);
        return this._balance;
    }

    // Private method (convention with underscore)
    _validateAmount(amount) {
        if (typeof amount !== 'number' || isNaN(amount)) {
            throw new Error("Invalid amount");
        }
        return true;
    }

    // Record transaction
    recordTransaction(amount, type, description) {
        const transaction = {
            id: this.transactions.length + 1,
            date: new Date(),
            amount,
            type,
            description,
            balanceAfter: this._balance
        };
        this.transactions.push(transaction);
        return transaction;
    }

    // Get account statement
    getStatement(startDate, endDate = new Date()) {
        return this.transactions.filter(transaction =>
            transaction.date >= startDate && transaction.date <= endDate
        );
    }

    // Calculate interest (to be overridden by child classes)
    calculateInterest() {
        return 0; // Base class returns 0 interest
    }

    // Display account info
    displayInfo() {
        return `${this.constructor.name} #${this.accountNumber}: ${this.accountHolder} - Balance: $${this.balance.toFixed(2)}`;
    }
}

class SavingsAccount extends FinancialAccount {
    constructor(accountNumber, accountHolder, balance = 0, interestRate = 0.01, insurancePolicy = null) {
        super(accountNumber, accountHolder, balance);
        this.interestRate = interestRate; // annual interest rate (e.g., 0.05 for 5%)
        this.insurancePolicy = insurancePolicy; // insurance policy details
    }

    // Calculate interest for given number of years (simple interest)
    calculateInterest(years = 1) {
        return this._balance * this.interestRate * years;
    }

    // Apply interest to the account and record a transaction
    accrueInterest(years = 1) {
        const interest = this.calculateInterest(years);
        if (interest > 0) {
            this._balance += interest;
            this.recordTransaction(interest, 'credit', `Interest (${years}yr)`);
        }
        return interest;
    }

    // Get insurance policy details
    getInsuranceDetails() {
        return this.insurancePolicy ? `Insurance Policy: ${this.insurancePolicy}` : 'No insurance policy';
    }
}

// Simple runnable example
if (typeof require !== 'undefined' && require.main === module) {
    const printHeader = title => console.log('\n=== ' + title + ' ===');

    // Create a list of accounts
    const accounts = [];

    printHeader('Creating Accounts');
    const acc = new FinancialAccount('001', 'Alice', 100);
    accounts.push(acc);
    const sav = new SavingsAccount('002', 'Bob', 1000, 0.05, 'Life Insurance Policy #12345'); // 5% annual with insurance
    accounts.push(sav);
    const sav2 = new SavingsAccount('003', 'Charlie', 500, 0.03); // 3% annual, no insurance
    accounts.push(sav2);

    // Function to print list of all accounts
    function printAllAccounts() {
        printHeader('List of All Accounts');
        const accountsTable = accounts.map(account => ({
            AccountNumber: account.accountNumber,
            Type: account.constructor.name,
            Holder: account.accountHolder,
            Balance: `$${account.balance.toFixed(2)}`
        }));
        console.table(accountsTable);
    }

    // Function to print account details and transactions by account number
    function printAccountDetails(accountNumber) {
        const account = accounts.find(acc => acc.accountNumber === accountNumber);
        if (!account) {
            console.log(`Account ${accountNumber} not found.`);
            return;
        }
        printHeader(`Account Details for ${accountNumber}`);
        console.log(account.displayInfo());
        if (account instanceof SavingsAccount) {
            console.log(account.getInsuranceDetails());
        }
        printHeader(`Transactions for ${accountNumber}`);
        if (account.transactions.length === 0) {
            console.log('No transactions yet.');
        } else {
            console.table(account.transactions);
        }
    }

    printHeader('FinancialAccount demo');
    console.log(acc.displayInfo());
    acc.deposit(50, 'Paycheck');
    console.log('After deposit:', acc.displayInfo());
    try {
        acc.withdraw(30, 'Groceries');
        console.log('After withdrawal:', acc.displayInfo());
    } catch (e) {
        console.log('Withdrawal failed:', e.message);
    }

    printHeader('SavingsAccount demo');
    console.log(sav.displayInfo());
    const interest = sav.accrueInterest(1); // accrue 1 year
    console.log(`Accrued interest: $${interest.toFixed(2)}`);
    console.log('After interest:', sav.displayInfo());
    console.log(sav.getInsuranceDetails());

    printHeader('SavingsAccount without insurance');
    console.log(sav2.displayInfo());
    console.log(sav2.getInsuranceDetails());

    // Print list of all accounts
    printAllAccounts();

    // Print details for specific accounts
    printAccountDetails('001');
    printAccountDetails('002');
    printAccountDetails('003');
    printAccountDetails('004'); // Non-existent
}

