emailjs.init("n84eVGeczJMPu9O6U");

// IMAGE DATA
const images = [
  { src:"https://i.ibb.co/JFsZcTrn/20251129-145311.jpg", price:2.5 },
  { src:"https://i.ibb.co/hFhX90m2/20251129-145329.jpg", price:3 },
  { src:"https://i.ibb.co/S700GtyH/20251129-145227.jpg", price:2 },
  { src:"https://i.ibb.co/FkQ3GBZc/20251129-145234.jpg", price:4 },
  { src:"https://i.ibb.co/C3c9JpVP/20251129-145108.jpg", price:1.5 },
  { src:"https://i.ibb.co/Mkf83bPF/20251129-145149.jpg", price:2.75 },
  { src:"https://i.ibb.co/PvCZ5pHm/20251129-145039.jpg", price:3.5 },
  { src:"https://i.ibb.co/TMMCbYTr/20251129-145049.jpg", price:2 },
  { src:"https://i.ibb.co/F4RKyPLQ/20251129-145027.jpg", price:1.8 },
  { src:"https://i.ibb.co/xKjJpyQg/20251129-145030.jpg", price:2.2 },
  { src:"https://i.ibb.co/sv50yGfb/20251129-144820.jpg", price:2.5 },
  { src:"https://i.ibb.co/PGYHsHQ1/20251129-144911.jpg", price:3.2 },
  { src:"https://i.ibb.co/qFMXTTPB/20251129-144817.jpg", price:2.9 }
];

const gallery = document.getElementById("gallery");

// LOADING SCREEN
setTimeout(() => {
  document.getElementById("loadingScreen").style.display = "none";
}, 2000);

// GENERATE GALLERY
images.forEach((imgData,index)=>{
  const box = document.createElement("div");
  box.className = "preview-box";
  box.innerHTML = `
    <img src="${imgData.src}" />
    <div class="partial-blur"></div>
    <p class="locked-text">Price: $${imgData.price.toFixed(2)}</p>
    <button class="buy-btn" onclick="buyImage(${index})">Buy Now</button>
  `;
  gallery.appendChild(box);
});

let selectedImage = null;

// BUY IMAGE FUNCTION
function buyImage(index){
  selectedImage = images[index];
  document.getElementById("selectedPreview").innerHTML = `<img src="${selectedImage.src}" />`;
  document.getElementById("paymentModal").style.display = "block";
}

function closePayment(){
  document.getElementById("paymentModal").style.display = "none";
}

function showQR(type, wallet){
  document.getElementById("selectedWallet").innerText = wallet;
  const qr = new QRious({
    element: document.getElementById('qrImage'),
    value: wallet,
    size: 220
  });
}

function copyWallet(){
  const wallet = document.getElementById("selectedWallet").innerText;
  if(wallet){
    navigator.clipboard.writeText(wallet)
      .then(()=>{ alert("Wallet address copied!"); })
      .catch(err=>{ console.log(err); });
  }
}

function confirmPayment(){
  const email = document.getElementById("emailInput").value;
  if(!email.trim()){ alert("Enter your email"); return; }

  if(!selectedImage) return alert("No image selected!");

  emailjs.send("service_mod4e09","template_r2cb89v",{
    user_email: email,
    download_link: selectedImage.src
  }).then(()=>{
    alert(`Payment confirmed! Download your image.`);
    closePayment();

    // Auto download
    const link = document.createElement('a');
    link.href = selectedImage.src;
    link.download = selectedImage.src.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    selectedImage = null;
    document.getElementById("emailInput").value = "";
  }).catch(err=>{
    console.log(err);
    alert("Error sending email");
  });
}