// EMAILJS INIT
emailjs.init("n84eVGeczJMPu9O6U");

setTimeout(() => {
  document.getElementById("loadingScreen").style.display = "none";
}, 2000);

const wallets = [
  "4ri9biLdoFkfq7nrkFVjDXGj2yX1bg1U3q5SGUt1WgVy",
  "D5qxyiLWwa7ZKRQYTLdLPJJmG1nMpCEGty",
  "bc1qdrw4yztttnnd35h33kmkw4tmhex9vkd83r8jg3",
  "0xff14ff21cecbfc487a0a7695ee16fe1ebf425bde"
];

let selectedWallet = wallets[0];
let selectedPrice = "2.50";
let selectedFile = "";

function openPayment(price, file) {
  selectedPrice = price;
  selectedFile = file;
  document.getElementById("paymentPrice").innerText = `Send $${price} using the QR code below:`;
  showQR(selectedWallet);
  document.getElementById("paymentModal").style.display = "block";
}

function closePayment() {
  document.getElementById("paymentModal").style.display = "none";
}

function showQR(wallet) {
  const qr = new QRious({
    element: document.getElementById('qrCanvas'),
    value: wallet,
    size: 220
  });
  document.getElementById("selectedWallet").innerText = wallet;
}

function copyWallet() {
  const walletText = document.getElementById("selectedWallet").innerText;
  navigator.clipboard.writeText(walletText).then(() => {
    alert("Wallet copied to clipboard!");
  });
}

function confirmPayment() {
  const email = document.getElementById("emailInput").value.trim();
  if (!email) {
    alert("Enter your email to receive the download link.");
    return;
  }

  const downloadURL = `https://yourwebsite.com/download.html?file=${encodeURIComponent(selectedFile)}`;

  emailjs.send("service_mod4e09", "template_r2cb89v", {
    user_email: email,
    download_link: downloadURL
  })
  .then(() => {
    alert("Payment confirmed! Download link sent to your email.");
    closePayment();
  })
  .catch(err => {
    console.error(err);
    alert("Error sending email. Please try again.");
  });
}