emailjs.init("n84eVGeczJMPu9O6U");

setTimeout(() => {
  document.getElementById("loadingScreen").style.display = "none";
}, 2000);

const products = [
  { url: "https://i.ibb.co/JFsZcTrn/20251129-145311.jpg", price: 2.50 },
  { url: "https://i.ibb.co/hFhX90m2/20251129-145329.jpg", price: 2.50 },
  { url: "https://i.ibb.co/S700GtyH/20251129-145227.jpg", price: 2.50 },
  { url: "https://i.ibb.co/FkQ3GBZc/20251129-145234.jpg", price: 2.50 },
  { url: "https://i.ibb.co/C3c9JpVP/20251129-145108.jpg", price: 2.50 },
  { url: "https://i.ibb.co/Mkf83bPF/20251129-145149.jpg", price: 2.50 },
  { url: "https://i.ibb.co/PvCZ5pHm/20251129-145039.jpg", price: 2.50 },
  { url: "https://i.ibb.co/TMMCbYTr/20251129-145049.jpg", price: 2.50 },
  { url: "https://i.ibb.co/F4RKyPLQ/20251129-145027.jpg", price: 2.50 },
  { url: "https://i.ibb.co/xKjJpyQg/20251129-145030.jpg", price: 2.50 },
  { url: "https://i.ibb.co/sv50yGfb/20251129-144820.jpg", price: 2.50 },
  { url: "https://i.ibb.co/PGYHsHQ1/20251129-144911.jpg", price: 2.50 },
  { url: "https://i.ibb.co/qFMXTTPB/20251129-144817.jpg", price: 2.50 }
];

let selectedProducts = [];
const gallery = document.getElementById("gallery");
const selectedPreview = document.getElementById("selectedPreview");

// Populate gallery
products.forEach((product,index) => {
  const card = document.createElement("div");
  card.className = "preview-box";
  card.innerHTML = `
    <img src="${product.url}" alt="Preview" />
    <div class="partial-blur"></div>
    <p class="locked-text">Locked — $${product.price}</p>
    <button class="buy-btn" onclick="toggleSelection(${index})">Select / Deselect</button>
  `;
  gallery.appendChild(card);
});

function toggleSelection(index) {
  const i = selectedProducts.indexOf(index);
  if(i>-1) selectedProducts.splice(i,1);
  else selectedProducts.push(index);
  updateCartTotal();
}

function updateCartTotal() {
  const total = selectedProducts.reduce((sum, idx) => sum + products[idx].price, 0);
  document.getElementById("cartTotal").innerText = total.toFixed(2);
  updateSelectedPreview();
}

function updateSelectedPreview() {
  selectedPreview.innerHTML = "";
  selectedProducts.forEach(idx => {
    const img = document.createElement("img");
    img.src = products[idx].url;
    selectedPreview.appendChild(img);
  });
}

function openPayment() {
  if(selectedProducts.length===0){ alert("Select at least one image."); return; }
  document.getElementById("paymentModal").style.display="block";
}

function closePayment() { document.getElementById("paymentModal").style.display="none"; }

function showQR(type,address){
  document.getElementById("selectedWallet").innerText = `${type}: ${address}`;
  new QRious({element: document.getElementById('qrImage'), value: address, size:220});
}

function confirmPayment() {
  const email = document.getElementById("emailInput").value;
  const wallet = document.getElementById("selectedWallet").innerText;

  if(!wallet){ alert("Select a wallet."); return; }
  if(!email){ alert("Enter your email."); return; }

  const links = selectedProducts.map(idx=>products[idx].url).join('\n');

  emailjs.send("service_mod4e09","template_r2cb89v",{
    user_email: email,
    download_link: links,
    wallet_used: wallet
  }).then(()=>{
    alert("Payment confirmed! Check your email for download links.");
    closePayment();
    selectedProducts=[];
    updateCartTotal();
  }).catch(err=>{ alert("Error sending email."); console.log(err); });
}