// Initialize EmailJS
emailjs.init("n84eVGeczJMPu9O6U");

let currentPrice = 0;
let currentImage = "";

window.onload = function() {
  // Hide loading after 2 seconds
  setTimeout(() => {
    document.getElementById("loadingScreen").style.display = "none";
  }, 2000);
};

// Open payment modal
function openPayment(price, imageLink) {
  currentPrice = price;
  currentImage = imageLink;
  document.getElementById("paymentModal").style.display = "block";
}

// Close modal
function closePayment() {
  document.getElementById("paymentModal").style.display = "none";
}

// Confirm payment
function confirmPayment() {
  const email = document.getElementById("emailInput").value;
  const proofFile = document.getElementById("paymentProof").files[0];

  if (!email) {
    alert("Enter your email to receive the download link.");
    return;
  }

  if (!proofFile) {
    alert("Please upload your payment proof.");
    return;
  }

  // Prepare form data for EmailJS
  const reader = new FileReader();
  reader.onload = function(event) {
    const base64Proof = event.target.result.split(",")[1];

    emailjs.send("service_62yc0zi", "template_ugv2uq9", {
      user_email: email,
      download_link: currentImage,
      price_paid: "$" + currentPrice,
      payment_proof: base64Proof
    })
    .then(() => {
      alert("Payment proof sent! You will receive the download link via email.");
      closePayment();
    })
    .catch((err) => {
      console.error(err);
      alert("Error sending payment proof. Check console.");
    });
  };

  reader.readAsDataURL(proofFile);
}