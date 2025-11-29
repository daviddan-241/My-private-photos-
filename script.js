// Initialize EmailJS
emailjs.init("n84eVGeczJMPu9O6U");

// Loading screen
setTimeout(() => document.getElementById("loadingScreen").style.display = "none", 2000);

// Gallery images & prices
const galleryImages = [
  {src:"https://i.ibb.co/svYZdvjC/20251129-145329.jpg", price:2.5},
  {src:"https://i.ibb.co/Z1WTQ08G/20251129-145311.jpg", price:2.0},
  {src:"https://i.ibb.co/PZJ1Cfqv/20251129-145249.jpg", price:2.0},
  {src:"https://i.ibb.co/JWJxTp7y/20251129-145227.jpg", price:2.0},
  {src:"https://i.ibb.co/G3GHgypc/20251129-145234.jpg", price:1.5},
  {src:"https://i.ibb.co/G33pCqcQ/20251129-145108.jpg", price:1.5},
  {src:"https://i.ibb.co/yct6MV5C/20251129-145149.jpg", price:1.5},
  {src:"https://i.ibb.co/0R9HT4cy/20251129-145039.jpg", price:1.0},
  {src:"https://i.ibb.co/MyR8TNTt/20251129-145049.jpg", price:1.0},
  {src:"https://i.ibb.co/fYNLzc8D/20251129-145027.jpg", price:1.0},
  {src:"https://i.ibb.co/Pvtzd2X1/20251129-145030.jpg", price:1.0},
  {src:"https://i.ibb.co/pBPcvQpB/20251129-144820.jpg", price:1.0},
  {src:"https://i.ibb.co/PsxJQ3tx/20251129-144911.jpg", price:1.0},
  {src:"https://i.ibb.co/9C6Z59F/20251129-144817.jpg", price:1.0}
];

const galleryContainer = document.querySelector(".gallery");

galleryImages.forEach((item,index)=>{
  const box = document.createElement("div");
  box.classList.add("preview-box");
  box.innerHTML = `
    <img src="${item.src}" class="blurred" alt="Image ${index+1}">
    <p class="locked-text">$${item.price.toFixed(2)}</p>
    <button onclick="openPayment('${item.src}',${item.price})" class="buy-btn">Buy Now</button>
  `;
  galleryContainer.appendChild(box);
});

// Payment modal
let selectedItem = null;

function openPayment(imgSrc, price){
  selectedItem = {imgSrc, price};
  document.getElementById("paymentModal").style.display = "block";
  document.getElementById("cryptoInfo").style.display = "none";
}

function closePayment(){
  document.getElementById("paymentModal").style.display = "none";
}

// Crypto info
const cryptoData = {
  BTC:{address:"bc1qdrw4yztttnnd35h33kmkw4tmhex9vkd83r8jg3", qr:"qr-btc.png"},
  ETH:{address:"0xff14ff21cecbfc487a0a7695ee16fe1ebf425bde", qr:"qr-eth.png"},
  SOL:{address:"4ri9biLdoFkfq7nrkFVjDXGj2yX1bg1U3q5SGUt1WgVy", qr:"qr-sol.png"},
  BSC:{address:"D5qxyiLWwa7ZKRQYTLdLPJJmG1nMpCEGty", qr:"qr-bsc.png"}
};

function showCrypto(crypto){
  document.getElementById("cryptoQR").src = cryptoData[crypto].qr;
  document.getElementById("cryptoAddress").innerText = cryptoData[crypto].address;
  document.getElementById("cryptoInfo").style.display = "block";
}

// Confirm payment
function confirmPayment(){
  const email = document.getElementById("emailInput").value;
  const proofFile = document.getElementById("paymentProof").files[0];

  if(!email.trim()){ alert("Enter your email"); return; }
  if(!proofFile){ alert("Upload payment proof"); return; }

  const reader = new FileReader();
  reader.onload = ()=>{
    emailjs.send("service_62yc0zi","template_ugv2uq9",{
      user_email: email,
      item_price: selectedItem.price,
      download_link: selectedItem.imgSrc,
      proof_file: reader.result
    })
    .then(()=>{ alert("Payment confirmed! Check your email."); closePayment(); })
    .catch(err=>{ console.log(err); alert("Error sending email."); });
  };
  reader.readAsDataURL(proofFile);
}