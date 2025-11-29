emailjs.init("n84eVGeczJMPu9O6U");

const images = [
  "https://i.ibb.co/JFsZcTrn/20251129-145311.jpg",
  "https://i.ibb.co/hFhX90m2/20251129-145329.jpg",
  "https://i.ibb.co/S700GtyH/20251129-145227.jpg",
  "https://i.ibb.co/FkQ3GBZc/20251129-145234.jpg",
  "https://i.ibb.co/C3c9JpVP/20251129-145108.jpg",
  "https://i.ibb.co/Mkf83bPF/20251129-145149.jpg",
  "https://i.ibb.co/PvCZ5pHm/20251129-145039.jpg",
  "https://i.ibb.co/TMMCbYTr/20251129-145049.jpg",
  "https://i.ibb.co/F4RKyPLQ/20251129-145027.jpg",
  "https://i.ibb.co/xKjJpyQg/20251129-145030.jpg",
  "https://i.ibb.co/sv50yGfb/20251129-144820.jpg",
  "https://i.ibb.co/PGYHsHQ1/20251129-144911.jpg",
  "https://i.ibb.co/qFMXTTPB/20251129-144817.jpg"
];

let selectedImages = [];

// LOADING SCREEN
setTimeout(() => {
  document.getElementById("loadingScreen").style.display = "none";
}, 2000);

// GENERATE GALLERY
const gallery = document.getElementById("gallery");
images.forEach(src=>{
  const box = document.createElement("div");
  box.className = "preview-box";
  box.innerHTML = `<img src="${src}" /><div class="partial-blur"></div>`;
  box.onclick = ()=>{
    if(!selectedImages.includes(src)) selectedImages.push(src);
    document.getElementById("cartTotal").innerText = (selectedImages.length * 2.5).toFixed(2);
  };
  gallery.appendChild(box);
});

// MODAL FUNCTIONS
function openPayment(){
  const preview = document.getElementById("selectedPreview");
  preview.innerHTML = "";
  selectedImages.forEach(src=>{
    const img = document.createElement("img");
    img.src = src;
    preview.appendChild(img);
  });
  document.getElementById("paymentModal").style.display = "block";
}

function closePayment(){
  document.getElementById("paymentModal").style.display = "none";
}

// SHOW QR + WALLET
function showQR(type, wallet){
  document.getElementById("selectedWallet").innerText = wallet;
  const qr = new QRious({
    element: document.getElementById('qrImage'),
    value: wallet,
    size: 220
  });
}

// COPY WALLET
function copyWallet(){
  const wallet = document.getElementById("selectedWallet").innerText;
  if(wallet){
    navigator.clipboard.writeText(wallet)
      .then(()=>{ alert("Wallet address copied!"); })
      .catch(err=>{ console.log(err); });
  }
}

// EMAILJS + AUTO DOWNLOAD
function confirmPayment(){
  const email = document.getElementById("emailInput").value;
  if(!email.trim()){ alert("Enter your email"); return; }

  emailjs.send("service_mod4e09", "template_r2cb89v", {
    user_email: email,
    download_link: selectedImages.join(", ")
  }).then(()=>{
    alert("Payment confirmed! Your downloads will start now.");
    closePayment();

    // Download images automatically
    selectedImages.forEach(src=>{
      const link = document.createElement('a');
      link.href = src;
      link.download = src.split('/').pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    // Clear cart
    selectedImages = [];
    document.getElementById("cartTotal").innerText = 0;
  }).catch(err=>{
    console.log(err);
    alert("Error sending email");
  });
}