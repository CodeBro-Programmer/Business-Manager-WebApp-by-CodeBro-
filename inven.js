let renderBody = document.querySelector(".section-body");

let medicines = JSON.parse(localStorage.getItem("MedStored")) || [
  { name: "Paracetamol", price: 500, quantity: 120 },
  { name: "Ibuprofen", price: 800, quantity: 75 },
  { name: "Amoxicillin", price: 1500, quantity: 50000 },
  { name: "Cough Syrup", price: 1200, quantity: 25 },
  { name: "Vitamin C", price: 600, quantity: 200 },
  { name: "Antacid", price: 700, quantity: 60 },
  { name: "Insulin", price: 5500, quantity: 15 },
  { name: "Aspirin", price: 650, quantity: 90 }
];


function RenderS(){

 renderBody.style.display 
    ="block"; renderBody.classList.add("render"); renderBody.innerHTML = "";

let body = medicines.forEach((d,index) =>{ renderBody.innerHTML += `<article class="container">
            <div>
                <p>${d.name}</p>
            </div>
            <div>
                <p>${d.price}</p>
            </div>
            <div>
                <p >${d.quantity}</p>
            </div>
            <div class="btn-div">
                <button class="btn-delete" id="del" data-index = ${index}>Delete</button>
            </div>
            <div class="btn-div">
                <button class="btn-edit" data-index = ${index}>Edit</button>
            </div>
        </article>`; 
        
        
  });
  }    
  RenderS();
  
  
        
        /* DELETE FUNCTIONALITY */        
       let itemToDelete = "";
       let itemToEdit = "";
       

renderBody.addEventListener("click", function (e) {

  if(e.target.classList.contains("btn-delete")){
    itemToDelete = Number(e.target.dataset.index);
    console.log(medicines[itemToDelete].name);

    
    confirmBox.classList.add("del-page");
  }
  
  if(e.target.classList.contains("btn-edit")){
      let itemToEdit = Number(e.target.dataset.index);
      window.location.href = `Edit.html?index=${itemToEdit}`;
  }

});





let yesBtn = document.querySelector(".yes-btn");
let cancelBtn = document.querySelector(".cancel-btn");
let confirmBox = document.querySelector(".delete-confirmation");

if(yesBtn){
yesBtn.addEventListener("click",()=>{
  if (itemToDelete >= 0) {
    medicines.splice(itemToDelete, 1);
    localStorage.setItem("MedStored",JSON.stringify(medicines)); 
    
     // 🔥 Re-render everything
    RenderS();
    confirmBox.classList.remove("del-page");
    itemToDelete = "";
  }

});
}

if(cancelBtn){
cancelBtn.addEventListener("click", function () {
  confirmBox.classList.remove("del-page");
  itemToDelete = "";
});
  }
  

    
      
