const menuButton = document.querySelector("#menuButton");
const navMenu = document.querySelector("#navMenu");
const transferForm = document.querySelector("#transferForm");
const transactions = document.querySelector("#transactions");
const formMessage = document.querySelector("#formMessage");
const transactionCount = document.querySelector("#transactionCount");
const supportButton = document.querySelector("#supportButton");

if (menuButton && navMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      navMenu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

if (transferForm && transactions && formMessage && transactionCount) {
  transferForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const recipient = document.querySelector("#recipient").value.trim();
    const amount = Number(document.querySelector("#amount").value);
    const note = document.querySelector("#note").value.trim();

    if (!recipient || amount <= 0) {
      formMessage.textContent = "Enter a valid recipient and amount.";
      return;
    }

    const item = document.createElement("article");
    item.innerHTML = `
      <span class="icon expense">-</span>
      <div>
        <strong>${escapeHtml(recipient)}</strong>
        <small>${escapeHtml(note || "Transfer sent")} - Just now</small>
      </div>
      <b>-${formatMoney(amount)}</b>
    `;

    transactions.prepend(item);
    updateTransactionCount();
    formMessage.textContent = `Transfer to ${recipient} was successful.`;
    transferForm.reset();
  });
}

if (supportButton && formMessage) {
  supportButton.addEventListener("click", () => {
    formMessage.textContent = "STL Bank support is ready to help. Call 1-800-STL-BANK.";
    document.querySelector("#transfer").scrollIntoView({ behavior: "smooth" });
  });
}

const contactForm = document.querySelector("#contactForm");
const contactFormMessage = document.querySelector("#contactFormMessage");

if (contactForm && contactFormMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    contactFormMessage.textContent = "Thanks. STL Bank support will reply soon.";
    contactForm.reset();
  });
}

function updateTransactionCount() {
  const count = transactions.querySelectorAll("article").length;
  transactionCount.textContent = `${count} transaction${count === 1 ? "" : "s"}`;
}

function formatMoney(value) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

function escapeHtml(value) {
  const element = document.createElement("span");
  element.textContent = value;
  return element.innerHTML;
}
