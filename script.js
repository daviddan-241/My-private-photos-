emailjs.init("n84eVGeczJMPu9O6U");

let selectedImage = "";
let selectedPrice = 0;

setTimeout(() => {
  document.getElementById("loadingScreen").style.display = "none";
}, 2000);

function openPayment(imageUrl, price) {
  selectedImage = imageUrl;
  selectedPrice = price;

  document.getElementById("paymentModal").style.display = "block";

  new QRCode(document.getElementById("qr-sol"), { text: "4ri9biLdoFkfq7nrkFVjDXGj2yX1bg1U3q5SGUt1WgVy", width: 200, height: 200 });
  new QRCode(document.getElementById("qr-sol2"), { text: "D5qxyiLWwa7ZKRQYTLdLPJJmG1nMpCEGty", width: 200, height: 200 });
  new QRCode(document.getElementById("qr-btc"), { text: "bc1qdrw4yztttnnd35h33kmkw4tmhex9vkd83r8jg3", width: 200, height: 200 });
  new QRCode(document.getElementById("qr-eth"), { text: "0xff14ff21cecbfc487a0a7695ee16fe1ebf425bde", width: 200, height: 200 });
}

function closePayment() {
  document.getElementById("paymentModal").style.display = "none";

  document.getElementById("qr-sol").innerHTML = "";
  document.getElementById("qr-sol2").innerHTML = "";
  document.getElementById("qr-btc").innerHTML = "";
  document.getElementById("qr-eth").innerHTML = "";
}

function confirmPayment() {
  let email = document.getElementById("emailInput").value;
  if (!email.trim()) {
    alert("Enter your email to receive the download link.");
    return;
  }

  let downloadLink = `download.html?img=${encodeURIComponent(selectedImage)}`;

  emailjs.send("service_62yc0zi", "template_ugv2uq9", {
    user_email: email,
    download_link: downloadLink,
    amount_paid: `$${selectedPrice}`
  })
  .then(() => {
    alert("Payment confirmed! Download link sent to your email.");
    closePayment();
  })
  .catch((err) => {
    alert("Error sending email. Check console.");
    console.log(err);
  });
}