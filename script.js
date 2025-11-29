emailjs.init("n84eVGeczJMPu9O6U");

const items = [
  { src:"https://i.ibb.co/svYZdvjC/20251129-145329.jpg", type:"image", price:2.5 },
  { src:"https://i.ibb.co/Z1WTQ08G/20251129-145311.jpg", type:"image", price:3 },
  { src:"https://i.ibb.co/PZJ1Cfqv/20251129-145249.jpg", type:"image", price:2 },
  { src:"https://i.ibb.co/JWJxTp7y/20251129-145227.jpg", type:"image", price:4 },
  { src:"https://i.ibb.co/G3GHgypc/20251129-145234.jpg", type:"image", price:2.2 },
  { src:"https://i.ibb.co/G33pCqcQ/20251129-145108.jpg", type:"image", price:3.1 }
];

const gallery = document.getElementById("gallery");
setTimeout(()=>{ document.getElementById("loadingScreen").style.display="none"; },2000);

items.forEach((item,index)=>{
  const box = document.createElement("div");
  box.className="preview-box";
  box.innerHTML=`
    <img src="${item.src}" />
    <div class="partial-blur"></div>
    <p class="locked-text">Price: $${item.price.toFixed(2)}</p>
    <button class="buy-btn" onclick="buyItem(${index})">Buy Now</button>
  `;
  gallery.appendChild(box);
});

let selectedItem = null;

function buyItem(index){
  selectedItem = items[index];
  document.getElementById("selectedPreview").innerHTML = `<img src="${selectedItem.src}" />`;
  document.getElementById("selectedPrice").innerText = `Price: $${selectedItem.price.toFixed(2)}`;
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
  if(!selectedItem){ alert("No item selected!"); return; }
  if(!proofFile){ alert("Upload proof of payment"); return; }

  const reader = new FileReader();
  reader.onload = function(){
    emailjs.send("service_mod4e09","template_r2cb89v",{
      user_email: email,
      download_link: selectedItem.src,
      price: selectedItem.price,
      proof_file: reader.result
    }).then(()=>{
      alert("Payment confirmed! Download starting...");
      const link=document.createElement('a');
      link.href=selectedItem.src;
      link.download=selectedItem.src.split('/').pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      closePayment();
      selectedItem=null;
      document.getElementById("emailInput").value="";
      document.getElementById("proofInput").value="";
    }).catch(err=>{ console.log(err); alert("Error sending email"); });
  };
  reader.readAsDataURL(proofFile);
}