// Initialize EmailJS
emailjs.init("n84eVGeczJMPu9O6U");

// Wallet address (update with your real address)
const walletAddress = "4ri9biLdoFkfq7nrkFVjDXGj2yX1bg1U3q5SGUt1WgVy";

// Hide loading screen after 2 seconds
setTimeout(() => {
  document.getElementById("loadingScreen").style.display = "none";
}, 2000);

let selectedPrice = "";
let selectedImage = "";

// Open payment modal
function openPayment(price, image) {
  selectedPrice = price;
  selectedImage = image;
  document.getElementById("paymentPrice").innerText = `Send $${price} using the QR code below:`;
  document.getElementById("selectedWallet").innerText = walletAddress;

  // Generate QR code
  const qr = new QRious({
    element: document.getElementById('qrCanvas'),
    value: walletAddress,
    size: 200
  });

  document.getElementById("paymentModal").style.display = "block";
}

// Close payment modal
function closePayment() {
  document.getElementById("paymentModal").style.display = "none";
}

// Copy wallet to clipboard
function copyWallet() {
  navigator.clipboard.writeText(walletAddress).then(() => {
    alert("Wallet address copied!");
  });
}

// Confirm payment and send email
function confirmPayment() {
  let email = document.getElementById("emailInput").value;
  let proof = document.getElementById("paymentProof").files[0];

  if (email.trim() === "") {
    alert("Enter your email to receive the download link.");
    return;
  }

  // Prepare email data
  const formData = {
    user_email: email,
    download_link: selectedImage,
    price: selectedPrice
  };

  if (proof) {
    const reader = new FileReader();
    reader.onload = function(event) {
      formData.payment_proof = event.target.result; // attach as base64
      sendEmail(formData);
    }
    reader.readAsDataURL(proof);
  } else {
    sendEmail(formData);
  }
}

// Send email using EmailJS
function sendEmail(data) {
  emailjs.send("service_mod4e09", "template_r2cb89v", data)
  .then(() => {
    alert("Payment confirmed! Download link sent to your email.");
    closePayment();
  })
  .catch((err) => {
    alert("Error sending email. Check console.");
    console.log(err);
  });
}