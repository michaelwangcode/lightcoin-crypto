// Class for a bank account
class Account {

  // Initialize an Account object
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  // Calculate and return balance using transactions array
  get balance() {
  	let balance = 0;
    for (let transaction of this.transactions) {
    	balance += transaction.value;
    }
    return balance;
  }

  // Add transaction to transactions array
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}


// Class for a monetary transaction
class Transaction {

  // Initialize Transaction object
  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  // Commit a transaction
  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}


// Class for withdrawing money
class Withdrawal extends Transaction{

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance >= this.amount);
  }
}


// Class for depositing money
class Deposit extends Transaction{

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

console.log('----------');
console.log("Initial balance: ", myAccount.balance);
console.log('----------');

t1 = new Withdrawal(50, myAccount);
console.log('Transaction 1:', t1.commit());
console.log('Balance:', myAccount.balance);
console.log('----------');

t2 = new Deposit(120, myAccount);
console.log('Transaction 2:', t2.commit());
console.log('Balance:', myAccount.balance);
console.log('----------');

t3 = new Withdrawal(9, myAccount);
console.log('Transaction 3:', t3.commit());
console.log('Balance:', myAccount.balance);
console.log('----------');
