const bank = [];

//Debit card (без овердрафта)
const bankAccount = {
  accountNumber: "123456789",
  accountHolderName: "Alice",
  balance: 0,
  deposit(sum) {
    //TODO Логика пополнения баланса
    if (sum > 0) {
      this.balance += sum;
      alert(`Success deposit: ${sum}$`);
    } else {
      alert(`Sum to deposit: ${sum}$ is negative`);
    }
  },
  withdraw(sum) {
    //TODO Логика списания баланса
    if (sum > 0 && this.balance >= sum) {
      this.balance -= sum;
      alert(`Success withdraw: ${sum}$`);
    } else {
      alert(
        `Not enough money (balance: ${this.balance}, sum: ${sum}$ or sum to withdraw is negative`
      );
    }
  },
  checkBalance() {
    //TODO Вывод баланса в консоль
    console.log(`Your balance: ${this.balance}`);
  },
};

const inputName = document.getElementById("name");
const showAccounts = document.getElementById("showAccounts");
const accountsList = document.getElementById("accountsList");

// createNewAccount();
function createNewAccount() {
  // console.log(inputName.value);
  // const copyBankAccount = {...bankAccount};
  // Math.random() * 100 (увеличения диапазона до 100) 0 - 100
  // Math.random() = 20 (смещение диапазона на 20 вправо)
  //TODO
  //Создать новый bankAccount где все пункты совпадают с bankAccount кроме
  //accountNumber: "123456789", - unique
  //accountHolderName: "Alice",
  //Добавить новый account в банк

  if (inputName.value.trim()) {
    const copyBankAccount = { ...bankAccount };
    copyBankAccount.accountHolderName = inputName.value.trim();
    copyBankAccount.accountNumber = Math.floor(Math.random() * 10 ** 9);
    bank.push(copyBankAccount);
    showAllAccounts();
  }
  console.log(bank);
  inputName.value = "";
  //HOMEWORK: Добавить обновление отображаемого html списка банковских аккаунтов
}



showAccounts.onclick = () => showAllAccounts();

const withdraw = document.getElementById("withdraw");
const deposit = document.getElementById("deposit");
const accountNumberInput = document.getElementById("accountNumber");
const amountInput = document.getElementById("amount");

//DRY - don't repeat yourself

withdraw.onclick = () => changeBalance(false);

deposit.onclick = () => changeBalance(true);

function changeBalance(flag) {
  const amount = +amountInput.value;
  const accountNumber = +accountNumberInput.value;

  const existingElement = bank.find((e) => e.accountNumber === accountNumber);

  console.log(existingElement);

  if (existingElement) {
    flag ? existingElement.deposit(amount) : existingElement.withdraw(amount);
    updateSingleAccount(existingElement);
  } else {
    alert(`Not found account ${accountNumber}`);
  }

  accountNumberInput.value = amountInput.value = "";
  console.log(existingElement);
  //HOMEWORK: Добавить обновление отображаемого html списка банковских аккаунтов
}

function updateSingleAccount(bankAccount) {
  const liToChange = document.getElementById(bankAccount.accountNumber);
  if (!liToChange) return;
  
  liToChange.textContent = `Name: ${bankAccount.accountHolderName}, Balance: ${bankAccount.balance}, Account number: ${bankAccount.accountNumber}`;
}

function showAllAccounts() {
  accountsList.innerHTML = ""; //clear ul

  if (bank.length === 0) {
    accountsList.textContent = "No accounts created";
    return;
  }

  for (const account of bank) {
    const li = document.createElement("li");
    li.id = account.accountNumber;
    li.textContent = `Name: ${account.accountHolderName}, Balance: ${account.balance}, Account number: ${account.accountNumber}`;
    accountsList.appendChild(li);
    // accountsList.innerHTML += `<li>${i}. Name: ${account.accountHolderName}, Balance: ${account.balance}, Account number: ${account.accountNumber}</li>`;
  }
}
