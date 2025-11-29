// EmailJS init
emailjs.init("n84eVGeczJMPu9O6U");

setTimeout(() => {
  document.getElementById("loadingScreen").style.display = "none";
}, 2000);

const cryptoData = {
  BTC: "bc1qexampleaddress",
  ETH: "0xffexampleaddress",
  SOL: "4ri9exampleaddress",
  BSC: "D5qexampleaddress"
};

let currentItemId = "";
let currentPrice = 0;

function openPayment(itemId, price) {
  currentItemId = itemId;
  currentPrice = price;
  document.getElementById("paymentModal").style.display = "block";
}

function closePayment() {
  document.getElementById("paymentModal").style.display = "none";
  document.getElementById("cryptoDetails").style.display = "none";
}

function selectCrypto(crypto) {
  document.getElementById("cryptoDetails").style.display = "block";
  document.getElementById("cryptoName").innerText = crypto;
  document.getElementById("cryptoAddress").innerText = cryptoData[crypto];
}

function confirmPayment() {
  let email = document.getElementById("emailInput").value;
  if(email.trim() === "") { alert("Enter your email."); return; }

  emailjs.send("service_62yc0zi", "template_ugv2uq9", {
    user_email: email,
    crypto: document.getElementById("cryptoName").innerText,
    crypto_address: document.getElementById("cryptoAddress").innerText,
    item_id: currentItemId,
    price: currentPrice,
    download_link: "https://yourwebsite.com/download"
  })
  .then(() => { alert("Payment confirmed! Check your email."); closePayment(); })
  .catch(err => { alert("Error sending email. Check console."); console.log(err); })
}