emailjs.init("n84eVGeczJMPu9O6U");

setTimeout(()=>{document.getElementById("loadingScreen").style.display="none";},2000);

let selectedItemIndex=null;
const addresses = {
  "SOL":"4ri9biLdoFkfq7nrkFVjDXGj2yX1bg1U3q5SGUt1WgVy",
  "BTC":"bc1qdrw4yztttnnd35h33kmkw4tmhex9vkd83r8jg3",
  "ETH":"0xff14ff21cecbfc487a0a7695ee16fe1ebf425bde"
};

function openPayment(index){
  selectedItemIndex=index;
  document.getElementById("paymentModal").style.display="block";
}

function closePayment(){ document.getElementById("paymentModal").style.display="none"; }

function showAddress(crypto){
  document.getElementById("cryptoAddress").innerText=`${crypto} Address: ${addresses[crypto]}`;
}

function confirmPayment(){
  let email=document.getElementById("emailInput").value.trim();
  let proof=document.getElementById("paymentProof").files[0];
  if(email===""){ alert("Enter your email."); return; }
  if(!proof){ alert("Upload proof of payment."); return; }

  const reader=new FileReader();
  reader.onload=function(){
    emailjs.send("service_62yc0zi","template_ugv2uq9",{
      user_email:email,
      content_index:selectedItemIndex+1,
      proof_file:reader.result
    }).then(()=>{ alert("Payment confirmed! You will get your download link."); closePayment(); })
    .catch(err=>{ console.log(err); alert("Error sending email."); });
  };
  reader.readAsDataURL(proof);
}