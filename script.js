// Initialize EmailJS
emailjs.init("n84eVGeczJMPu9O6U");

// Hide loading screen
setTimeout(() => {
  document.getElementById("loadingScreen").style.display = "none";
}, 1500);

// Initial gallery images
let images = [
  { src: "https://i.ibb.co/svYZdvjC/20251129-145329.jpg", price: 2.5 },
  { src: "https://i.ibb.co/Z1WTQ08G/20251129-145311.jpg", price: 3 },
  { src: "https://i.ibb.co/PZJ1Cfqv/20251129-145249.jpg", price: 1.5 },
  { src: "https://i.ibb.co/JWJxTp7y/20251129-145227.jpg", price: 2 },
  { src: "https://i.ibb.co/G3GHgypc/20251129-145234.jpg", price: 2.2 },
  { src: "https://i.ibb.co/G33pCqcQ/20251129-145108.jpg", price: 2.8 },
  { src: "https://i.ibb.co/yct6MV5C/20251129-145149.jpg", price: 1.8 },
  { src: "https://i.ibb.co/0R9HT4cy/20251129-145039.jpg", price: 2.1 },
  { src: "https://i.ibb.co/MyR8TNTt/20251129-145049.jpg", price: 2.4 },
  { src: "https://i.ibb.co/fYNLzc8D/20251129-145027.jpg", price: 1.9 },
  { src: "https://i.ibb.co/Pvtzd2X1/20251129-145030.jpg", price: 2.3 },
  { src: "https://i.ibb.co/pBPcvQpB/20251129-144820.jpg", price: 2 },
  { src: "https://i.ibb.co/PsxJQ3tx/20251129-144911.jpg", price: 2.6 },
  { src: "https://i.ibb.co/9C6Z59F/20251129-144817.jpg", price: 2.7 }
];

// Display gallery
const gallery = document.getElementById("gallery");
const adminGallery = document.getElementById("adminGallery");

function displayGallery() {
  gallery.innerHTML = "";
  images.forEach((img, index) => {
    const box = document.createElement("div");
    box.classList.add("preview-box");
    box.innerHTML = `
      <img src="${img.src}" class="blurred" alt="Locked Content" />
      <p class="locked-text">$${img.price}</p>
      <button class="buy-btn" onclick="openPayment(${index})">Buy Now</button>
    `;
    gallery.appendChild(box);
  });
}
displayGallery();

// Payment modal
let currentImage = null;
function openPayment(index) {
  currentImage = images[index];
  document.getElementById("paymentModal").style.display = "block";
}
function closePayment() { document.getElementById("paymentModal").style.display = "none"; }

function confirmPayment() {
  let email = document.getElementById("emailInput").value;
  if(email.trim() === "") { alert("Enter your email."); return; }

  emailjs.send("service_62yc0zi", "template_ugv2uq9", {
    user_email: email,
    download_link: currentImage.src
  }).then(() => {
    alert("Payment confirmed! Download link sent to your email.");
    closePayment();
  }).catch(err => {
    console.log(err);
    alert("Error sending email. Check EmailJS setup.");
  });
}

// Admin login
const adminBtn = document.getElementById("adminBtn");
const adminModal = document.getElementById("adminLoginModal");
const adminPanel = document.getElementById("adminPanel");
function openAdmin() { adminModal.style.display = "block"; }
function closeAdmin() { adminModal.style.display = "none"; }

function loginAdmin() {
  const pw = document.getElementById("adminPassword").value;
  if(pw === "Daviddan09") {
    adminModal.style.display = "none";
    adminPanel.style.display = "block";
    adminBtn.style.display = "none";
    renderAdminGallery();
  } else { alert("Incorrect password"); }
}

// Admin add image
function addImage() {
  const url = document.getElementById("imageUrl").value;
  const price = parseFloat(document.getElementById("imagePrice").value);
  if(!url || !price) { alert("Enter image URL and price."); return; }
  images.push({src:url, price:price});
  displayGallery();
  renderAdminGallery();
  document.getElementById("imageUrl").value = "";
  document.getElementById("imagePrice").value = "";
}

// Admin gallery preview
function renderAdminGallery() {
  adminGallery.innerHTML = "";
  images.forEach((img, i) => {
    const box = document.createElement("div");
    box.classList.add("preview-box");
    box.innerHTML = `<img src="${img.src}" class="blurred" /><p>$${img.price}</p>`;
    adminGallery.appendChild(box);
  });
}