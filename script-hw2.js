const bank = [];

//Debit card (без овердрафта)
const bankAccount = {
  accountNumber: "123456789",
  accountHolderName: "Alice",
  balance: 0,
  deposit(sum) {
    if (sum > 0) {
      this.balance += sum;
      alert(`Success deposit: ${sum}$`);
    } else {
      alert(`Sum to deposit: ${sum}$ is negative`);
    }
  },
  withdraw(sum) {
    if (sum > 0 && this.balance >= sum) {
      this.balance -= sum;
      alert(`Success withdraw: ${sum}$`);
    } else {
      alert(
        `Not enough money (balance: ${this.balance}), sum: ${sum}$ or sum to withdraw is negative`
      );
    }
  },
  checkBalance() {
    console.log(`Your balance: ${this.balance}`);
  },
};

const showAccounts = document.getElementById("showAccounts");
const accountsList = document.getElementById("accountsList");
const inputName = document.getElementById("name");
const withdraw = document.getElementById("withdraw");
const deposit = document.getElementById("deposit");
const accountNumberInput = document.getElementById("accountNumber");
const amountInput = document.getElementById("amount");

showAccounts.onclick = () => {
  accountsList.innerHTML = ""; //clear ul
  let i = 0;
  for (const account of bank) {
    i++;
    showSingleAccount(i, account);
  }
};

withdraw.onclick = () => changeBalance(false);
deposit.onclick = () => changeBalance(true);

function createNewAccount() {
  if (inputName.value.trim()) {
    const copyBankAccount = { ...bankAccount };
    copyBankAccount.accountHolderName = inputName.value.trim();
    copyBankAccount.accountNumber = Math.floor(Math.random() * 10 ** 9);
    bank.push(copyBankAccount);

    showSingleAccount(bank.length, copyBankAccount);
  } else {
    alert("Enter name!");
  }
  inputName.value = "";
}

function changeBalance(flag) {
  const amount = +amountInput.value;
  const accountNumber = +accountNumberInput.value;

  const existingElement = bank.find((e) => e.accountNumber === accountNumber);

  if (existingElement) {
    flag ? existingElement.deposit(amount) : existingElement.withdraw(amount);
    const span = document.getElementById(`${accountNumber}Balance`);
    span.textContent = existingElement.balance;
  } else {
    alert(`Not found account ${accountNumber}`);
  }

  accountNumberInput.value = amountInput.value = "";
}

function showSingleAccount(index, account) {
  const li = document.createElement("li");
  li.id = `${account.accountNumber}`;
  accountsList.appendChild(li);

  const spanIndex = document.createElement("span");
  spanIndex.className = "account-index";
  spanIndex.textContent = `${index}. `;
  li.appendChild(spanIndex);

  li.append(`Name: ${account.accountHolderName}, Balance: `);

  const spanBalance = document.createElement("span");
  spanBalance.id = `${account.accountNumber}Balance`;
  spanBalance.textContent = `${account.balance}`;
  li.appendChild(spanBalance);

  li.append(`, Account number: ${account.accountNumber}`);

  const btnDelete = document.createElement("button");
  btnDelete.textContent = "Delete";
  btnDelete.id = `${account.accountNumber}Delete`;
  li.appendChild(btnDelete);

  btnDelete.onclick = () => deleteAccount(account);
}

function deleteAccount(account) {
  const existingElement = bank.find(
    (e) => e.accountNumber === account.accountNumber
  );
  const indexOfExistingElement = bank.findIndex(
    (e) => e.accountNumber === account.accountNumber
  );

  if (existingElement) {
    bank.splice(indexOfExistingElement, 1);
    const liToDelete = document.getElementById(account.accountNumber);
    liToDelete.remove();

    updateIndexes();

    alert(`Account ${account.accountNumber} deleted`);
  } else {
    alert(`Account ${account.accountNumber} not found`);
  }
}

function updateIndexes() {
  const allLis = accountsList.querySelectorAll("li");
  console.log(allLis);

  allLis.forEach((li, index) => {
    const spanIndex = li.querySelector(".account-index");
    if (spanIndex) {
      spanIndex.textContent = `${index + 1}. `;
    }
  });
}
