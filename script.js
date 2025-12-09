const bank = [];

// DEBIT CARD (Без Овердрафта)
const bankAccount = {
  accountNumber: "123456789",
  accountHolderName: "Alice",
  balance: 0,
  isFrozen: false,
  deposit(sum) {
    // TODO Логика пополнения баланса
    if (this.isFrozen) {
      alert(`Account ${this.accountNumber} is frozen`);
      return;
    }
    if (sum > 0) {
      this.balance += sum;
      alert(`Успешное пополнение баланса на сумму ${sum}€`);
    } else {
      alert(`Сумма пополнения ${sum}€ отрицательна`);
    }
  },
  withdraw(sum) {
    // TODO Логика списания баланса
    if (this.isFrozen) {
      alert(`Account ${this.accountNumber} is frozen`);
      return;
    }
    if (this.balance >= sum && sum > 0) {
      this.balance -= sum;
      alert(`Успешное списание баланса на сумму ${sum}€`);
    } else {
      alert(
        `Недостаточно средств для списания (balance: ${this.balance}, sum: ${sum}€) или сумма списания отрицательна`
      );
    }
  },
  checkBalance() {
    // TODO Вывод баланса в консоли
    console.log(this.balance);
  },
};

const inputName = document.getElementById("name");
const accountsList = document.getElementById("accountsList");

function createNewAccount() {
  if (inputName.value.trim()) {
    const copyBankAccount = { ...bankAccount };
    copyBankAccount.accountHolderName = inputName.value.trim();
    // copyBankAccount.accountNumber = '' + Math.floor(Math.random() * 9 * (10 ** 8) + 10 ** 8);
    copyBankAccount.accountNumber = Math.floor(
      Math.random() * 9 * 10 ** 8 + 10 ** 8
    );
    bank.push(copyBankAccount);

    const li = document.createElement("li");

    const spanLength = document.createElement("span");
    spanLength.id = `${copyBankAccount.accountNumber}Length`;
    spanLength.className = "bankLength";
    spanLength.textContent = `${bank.length}`;
    li.append(spanLength);

    const spanBalance = document.createElement("span");
    spanBalance.textContent = `${copyBankAccount.balance}`;
    spanBalance.id = `${copyBankAccount.accountNumber}Balance`;

    li.append(
      `. Name: ${copyBankAccount.accountHolderName}, Balance: `,
      spanBalance,
      ` Account number: ${copyBankAccount.accountNumber}`
    );

    const btn = document.createElement("button");
    btn.id = `${copyBankAccount.accountNumber}Delete`;
    btn.textContent = "X";
    li.appendChild(btn);
    accountsList.appendChild(li);

    //чекбокс для заморозки/разморозки банковского аккаунта -> текст аккаунта становится серым, невозможно изменять баланс. если баланс нулевой то можно удалить
    const labelFrozen = document.createElement("label");
    labelFrozen.textContent = "Frozen";
    li.appendChild(labelFrozen);

    const checkBoxFrozen = document.createElement("input");
    checkBoxFrozen.type = "checkbox";
    checkBoxFrozen.id = `${copyBankAccount.accountNumber}Frozen`;
    labelFrozen.appendChild(checkBoxFrozen);

    btn.onclick = () => {
      const bankAccountNumber = btn.id.split("Delete")[0];
      const index = bank.findIndex((e) => e.accountNumber == bankAccountNumber);
      const existingElement = bank.find(
        (e) => e.accountNumber == bankAccountNumber
      );

      if (index >= 0) {
        if (existingElement.isFrozen && existingElement.balance !== 0) {
          alert(`Account ${bankAccountNumber} cannot be deleted`);
          return;
        }
        li.remove();
        bank.splice(index, 1);

        const allItems = accountsList.querySelectorAll("li");
        allItems.forEach((li, index) => {
          const span = li.querySelector(".bankLength");
          if (span) span.textContent = index + 1;
        });
      }
    };

    checkBoxFrozen.onclick = () => {
      const bankAccountNumber = checkBoxFrozen.id.split("Frozen")[0];
      const existingElement = bank.find(
        (e) => e.accountNumber == bankAccountNumber
      );

      if (!existingElement) {
        alert(`Account ${bankAccountNumber} not found`);
        return;
      }

      if (!existingElement.isFrozen) {
        li.style.color = "grey";
        existingElement.isFrozen = true;
        alert(`Account ${bankAccountNumber} is frozen`);
      } else {
        li.style.color = "black";
        existingElement.isFrozen = false;
        alert(`Account ${bankAccountNumber} is defrosted`);
      }
    };
  }
  inputName.value = "";
}

const withdraw = document.getElementById("withdraw");
const deposit = document.getElementById("deposit");
const amountInput = document.getElementById("amount");
const accountNumberInput = document.getElementById("accountNumber");

// DRY - Don't Repeat Yourself - Не повторяйся

function changeBalance(operation) {
  const amount = +amountInput.value;
  const accountNumber = +accountNumberInput.value;
  // TODO: Дописать принцип работы при нажатии кнопки withdraw
  const existingElement = bank.find((e) => e.accountNumber === accountNumber);

  if (existingElement) {
    operation
      ? existingElement.deposit(amount)
      : existingElement.withdraw(amount);
    // HOMEWORK: 2. Добавить обновление отображаемого в html списка банковских аккаунтов
    const spanBalance = document.getElementById(`${accountNumber}Balance`);
    console.log(existingElement);
    console.log(spanBalance);

    spanBalance.textContent = existingElement.balance;
  } else {
    alert("Аккаунта с таким номером не найдено. Попробуйте ещё раз");
  }
  amountInput.value = accountNumberInput.value = "";
}
withdraw.onclick = () => {
  changeBalance(false);
};
deposit.onclick = () => {
  changeBalance(true);
};
// CRUD: ( Create Read Update Delete )
