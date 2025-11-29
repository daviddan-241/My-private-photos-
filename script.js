emailjs.init("n84eVGeczJMPu9O6U");

const images = [
  { src:"https://i.ibb.co/JFsZcTrn/20251129-145311.jpg", price:2.5 },
  { src:"https://i.ibb.co/hFhX90m2/20251129-145329.jpg", price:3 },
  { src:"https://i.ibb.co/S700GtyH/20251129-145227.jpg", price:2 },
  { src:"https://i.ibb.co/FkQ3GBZc/20251129-145234.jpg", price:4 }
];

const gallery = document.getElementById("gallery");

setTimeout(()=>{ document.getElementById("loadingScreen").style.display="none"; },2000);

images.forEach((imgData,index)=>{
  const box = document.createElement("div");
  box.className="preview-box";
  box.innerHTML=`
    <img src="${imgData.src}" />
    <div class="partial-blur"></div>
    <p class="locked-text">Price: $${imgData.price.toFixed(2)}</p>
    <button class="buy-btn" onclick="buyImage(${index})">Buy Now</button>
  `;
  gallery.appendChild(box);
});

let selectedImage = null;

function buyImage(index){
  selectedImage = images[index];
  document.getElementById("selectedPreview").innerHTML = `<img src="${selectedImage.src}" />`;
  document.getElementById("paymentModal").style.display="block";
}

function closePayment(){ document.getElementById("paymentModal").style.display="none"; }

function showQR(type,wallet){
  document.getElementById("selectedWallet").innerText = wallet;
  new QRious({ element: document.getElementById('qrImage'), value: wallet, size:220 });
}

function copyWallet(){
  const wallet = document.getElementById("selectedWallet").innerText;
  if(wallet) navigator.clipboard.writeText(wallet).then(()=>alert("Wallet copied!"));
}

function confirmPayment(){
  const email = document.getElementById("emailInput").value;
  const proofFile = document.getElementById("proofInput").files[0];

  if(!email.trim()){ alert("Enter your email"); return; }
  if(!selectedImage){ alert("No image selected!"); return; }
  if(!proofFile){ alert("Upload proof of payment"); return; }

  const reader = new FileReader();
  reader.onload = function(){
    emailjs.send("service_mod4e09","template_r2cb89v",{
      user_email: email,
      download_link: selectedImage.src,
      proof_file: reader.result
    }).then(()=>{
      alert("Payment confirmed! Download starting...");
      const link=document.createElement('a');
      link.href=selectedImage.src;
      link.download=selectedImage.src.split('/').pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      closePayment();
      selectedImage=null;
      document.getElementById("emailInput").value="";
      document.getElementById("proofInput").value="";
    }).catch(err=>{ console.log(err); alert("Error sending email"); });
  };
  reader.readAsDataURL(proofFile);
}