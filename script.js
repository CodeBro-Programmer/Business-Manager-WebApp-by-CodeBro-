/* NAV */
// Navbar button event listeners
document.addEventListener("DOMContentLoaded", () => {
    let fetchBN = JSON.parse(localStorage.getItem("businessDetails")) || [];
    let BN = fetchBN[0].businessName;
    let headerP = document.querySelector(".header-title");
    headerP.textContent = BN;
    /* renderM = JSON.parse(localStorage.getItem("soldMoney")) || [];
    localStorage.removeItem("soldMoney");
    console.log(renderM); */
});



let userInput = document.querySelector(".input");
let suggContainer = document.querySelector(".sugg-container");
function clearLocalStorage(){
    localStorage.removeItem("MedStored");
    localStorage.removeItem("sold");
    localStorage.removeItem("soldMoney");
    localStorage.removeItem("weeklySoldMoney");
    localStorage.removeItem("employees");
    localStorage.removeItem("businessDetails");
}
         /* clearLocalStorage();   */
      
      
/* TIME COMPONENT */
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const dayNumber = now.getDay();
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const day = days[dayNumber];
    const date = now.getDate();


let T = document.getElementById("currentTime");
function time(){
    const nows = new Date();
    const h = nows.getHours().toString().padStart(2, '0');
    const m = nows.getMinutes().toString().padStart(2, '0');
    const s = nows.getSeconds().toString().padStart(2, '0');
    let time = `${h}:${m}:${s}`;
    T.textContent = time;
  }
  if(T){
  setInterval(time,1000);
  time();  
  }
  
/* CHECK WHETHER YOU HAVE LOW QUANTITY PRODUCT AND CHANGE THE NOTI ICON ACCORDING TO IT */ 
function checkLowQtyPro(){
    let notiStorage = JSON.parse(localStorage.getItem("LowProductQty")) || [];
    let notifIcon = document.getElementById("lowQuantityAlert");
    
    if(notifIcon){
        if(notiStorage.length === 0){
            notifIcon.style.backgroundColor = "blue";
        }
        else{
           setInterval(colorChange,500);
            colorChange();
        }
    }
    
}
checkLowQtyPro();

/* LOW QUANTITY ALERT FUNCTION */
function colorChange(){
    let notIcon = document.getElementById("lowQuantityAlert");
    if(notIcon){
        if(notIcon.style.backgroundColor === "red"){
            notIcon.style.backgroundColor = "blue";
        }
        else{
            notIcon.style.backgroundColor = "red";
        }
    }
}


/* FUNCTION THAT UPDATES THE PROFIT SECTION */
function UpdateTWMoney(){
    weeklyMoneyUpdate();
    
}

/* DISPLAY MONEY VALUES ONLOAD*/
let aWeekHours = 0;

function renderTodayMoney(){
     let todayAmount = document.getElementById("total-profit-today");

    if(todayAmount){
        let r = JSON.parse(localStorage.getItem("soldMoney")) || [];
        if(hours === 11 && minutes === 36 && seconds === 00){
            localStorage.setItem("soldMoney",JSON.stringify([]));
            let ren = JSON.parse(localStorage.getItem("soldMoney")) || [];
            console.log(ren);
            if(ren.length === 0){
                todayAmount.textContent = "$"+0;
            }
        }
        else{
            let calc = r.reduce((acc,val) => acc + Number(val),0);   

            todayAmount.textContent = "$" + calc; 
    } 
    }
} 


setInterval(renderTodayMoney,1000);
renderTodayMoney();
 
function renderWeeklyMoney(){
    let weeklyDis = document.getElementById("total-profit-week");

    if(weeklyDis){
         let rW = JSON.parse(localStorage.getItem("weeklySoldMoney")) || [];
         if(aWeekHours == 168){
             localStorage.removeItem("weeklySoldMoney");
         }
         else{
         let calcW = rW.reduce((acc,val) => acc + Number(val),0); 
        weeklyDis.textContent = "$" + calcW;
        }
    }
}
renderWeeklyMoney();
 
 
/* ADD PRODUCT LOADING FUNCTION */
function loading(){
    let load = document.querySelector(".load-background");
    load.classList.add("loading");
}


/* MEDICINE STORING FUNCTION */
function StoreMed(){
let store = localStorage.setItem("MedStored",JSON.stringify(medicines));
    return store;
    
}

function moneyRenderOnload(){
    
}

/* MEDICINE PARSING SECTION*/


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


/* FUNCTION THAT REMOVES PRODUCT IF IT'S QUANTITY IS ZERO */
function removePro(){
for (let i = medicines.length - 1; i >= 0; i--) {
  if (medicines[i].quantity === 0) {
    medicines.splice(i, 1); // remove 1 item at index i
  }
}
localStorage.setItem("MedStored", JSON.stringify(medicines));
}
removePro();
calTotalQ();



/* QUANTITY UPDATING FUNCTION */
function calTotalQ(){
  let totalQuantity = 0;


  medicines.forEach(med => {  totalQuantity += Number(med.quantity);
  });

  let box = document.getElementById("total-p-number");
  if(box){
    box.textContent = `${totalQuantity} Units`;
  }
}


/* SELLER SECTION FUNCTIONALITY */
if(userInput){  
 userInput.addEventListener('input', ()=>{ 
 suggContainer.innerHTML = "";
let matches = medicines.filter(p =>{return p["name"].toLowerCase().includes(userInput.value.toLowerCase());  })

       matches.forEach(med => {let para = document.createElement("p");
        para.setAttribute("class", "suggestion");
        para.classList.toggle("suggestions");
        para.textContent = med.name;
        suggContainer.appendChild(para);
        
      para.addEventListener('click', ()=>{
          userInput.value = med.name;
          suggContainer.innerHTML = "";
      })
}) 

if(userInput.value === ""){
    suggContainer.innerHTML = "";
}
}) 


/* SEARCH CODE */

let search = document.getElementById("search-btn");

search.addEventListener('click', ()=>{
   miniLoad();
   setTimeout(DisplayDrugContent,3000);
   
   let complSale = document.querySelector(".compl-sale-btn");
   let quantityInput = document.querySelector(".sell-input");
   let drugContent = document.querySelector(".content");
   let drugQuantity = document.querySelector(".quantity");
   let worth = document.querySelector(".worth");
   worth.textContent = "";
   
   /* Function that Calculates the sale value of the product while seller in inputting product quantity */
   drugContent.addEventListener("input",()=>{
       worth.textContent = "";
       let q = quantityInput.value;
       let priceP = document.querySelector(".price").textContent;
       let saleV = Number(q)*Number(priceP);
       if(saleV == 0){
           worth.textContent = "";
       }
       else{
           worth.textContent = `Worth\n${saleV}`;
       }
       
   })

complSale.addEventListener("click", () => {
  let currentName = document.querySelector(".title").textContent;
   
  // find AGAIN from array (fresh) //
  let currentDrug = medicines.find(
    med => med.name.toLowerCase() === currentName.toLowerCase()
  );

  if(!currentDrug){
    alert("Product not found");
    return;
  }
  
  let sellQty = Number(quantityInput.value);
  let totalQuan = Number(currentDrug.quantity);
  
  for(let i = 0; i<quantityInput.length; i++){
  let sellQ = Number(quantityInput[i].value);

  if(sellQ <= 0){
    alert("Enter valid quantity");
  }
  }

  if(sellQty > totalQuan){
    alert("Not enough in stock");
    return;
  }

  let remaining = totalQuan - sellQty;
  currentDrug.quantity = remaining;
  if(remaining <= 20/100 * Number(totalQuan)){
  let noti = `${currentDrug.name} is remaining ${remaining}, Please re-stock<br> SUCCESSFULLY NOTIFIED ON ${day} ${date}, ${time()}`;
  let store = JSON.parse(localStorage.getItem("LowProductQty")) || [];
  if(typeof store === "string"){
      store = [store];
  }
  store.push(noti);  
  let finalStoreNoti = localStorage.setItem("LowProductQty",JSON.stringify(store));
  let notifyIcon = document.getElementById("lowQuantityAlert");
  if(notifyIcon){
      notifyIcon.style.backgroundColor = "red";
  }
      
  }
  drugQuantity.textContent = remaining;
  
  let alertContent = document.querySelector(".successful-pInfo");
  StoreMed();
  calTotalQ();
  sellQtyUpdate();
  TotalMoneyUpdate();
  UpdateTWMoney();
  worth.textContent = "";
  loading();
  setTimeout(successMessage,2000);
  alertContent.textContent = `FOR \n ${currentDrug.name}, ${currentDrug.quantity} units remaining`;
  removePro();
  drugContent.style.display = "none";
   quantityInput.value = "";
})
})

/* SELL QUANTITY FUNCTION */
function sellQtyUpdate(){
    let sellQuantityInput = document.querySelector(".sell-input");
    let selQty = Number(sellQuantityInput.value);
    
    let renderSoldQty = JSON.parse(localStorage.getItem("sold")) || [];
    
    
    renderSoldQty.push(selQty);
    
    let storeSoldQty = localStorage.setItem("sold",JSON.stringify(renderSoldQty));
    
    
    let totalSold = renderSoldQty.reduce((acc,val) => acc + val,0)
    
    let soldPara = document.getElementById("total-sold-p-number");
    
    if(soldPara){
        soldPara.textContent = `${totalSold} Units` ;
    }
    
    
}

sellQtyUpdate();



/* TOTAL MONEY OF SOLD PRODUCTS */
/* It updates on sale completed */

let money;// pass only this sale


/* TODAY */
function TotalMoneyUpdate(){
    let moneyAmtRender = JSON.parse(localStorage.getItem("soldMoney")) || [];
    if(moneyAmtRender.length >= 7){
        localStorage.removeItem("soldMoney");
    }
    let drugPric = document.querySelector(".price");
    let sellQuanInput = document.querySelector(".sell-input");

    let soldQty = Number(sellQuanInput.value);

    let currentMoney = Number(drugPric.textContent) * soldQty;

    moneyAmtRender.push(currentMoney);

    localStorage.setItem("soldMoney", JSON.stringify(moneyAmtRender));

   calTotalMoney = moneyAmtRender.reduce((acc,val) => acc + val,0);
    
    let displayAmount = document.getElementById("total-profit-today");

    if(displayAmount){
        displayAmount.textContent = "$" + calTotalMoney;
    }
   
    money = currentMoney;
}



/* WEEKLY */
function weeklyMoneyUpdate(){
    let week = JSON.parse(localStorage.getItem("weeklySoldMoney")) || [];

    week.push(money);

    localStorage.setItem("weeklySoldMoney", JSON.stringify(week));

    let weeklyMoney = week.reduce((acc, val) => acc + val, 0);

    let weeklyDisplay = document.getElementById("total-profit-week");

    if (weeklyDisplay) {
        weeklyDisplay.textContent = "$" + weeklyMoney;
    }
    
}
    
    


/* MINI LOADING */
function miniLoad(){
    let mLoad = document.querySelector(".med-load");
    mLoad.classList.add("mini-load");
    let drugContent = document.querySelector(".content");
    drugContent.style.display = "none";
}


/* DISPLAYS SUCCESS MESSAGE (FISRT PAGE)*/
function successMessage(){
    let load = document.querySelector(".load-background");
    load.classList.remove("loading");
    let alertContent = document.querySelector(".successful-pInfo");
  let alertBox = document.querySelector(".alert");
  
  alertBox.style.display = "block";
  alertBox.classList.add("alert-show");
  
  
  
  let exit = document.querySelector(".ok").onclick = ()=>{
      alertBox.style.display = "none";
  }
}


/* DISPLAYS MEDICINE NAME, PRICE etc */

function DisplayDrugContent(){
     if(userInput.value === ""){
        let mLoad = document.querySelector(".med-load");
        mLoad.classList.remove("mini-load");
        alert("input something");
        return;
    }
    
    
    let found = medicines.find(drug => {return drug.name.toLowerCase() === userInput.value.toLowerCase();   })
    
    if(found){
     let drugContent = document.querySelector(".content");
     let drugName = document.querySelector(".title");
     let drugPrice = document.querySelector(".price");
     let drugQuantity = document.querySelector(".quantity");
     drugContent.style.display = "block";
     drugContent.classList.add("drug-about");
     drugName.textContent = found.name;
     drugPrice.textContent = found.price;
     drugQuantity.textContent = found.quantity;
     userInput.value = "";
     
    }
    else{
        alert("not found");
    }
    let mLoad = document.querySelector(".med-load");
    mLoad.classList.remove("mini-load");

}



/* ADD PRODUCT SECTION */
let EnterAddProductPageBtn = document.getElementById("add-pro").onclick = ()=>{
    loading();
    setTimeout(()=>{window.location.href = "addProduct.html"},2000)
}
}

/* DISPLAYS SUCCESS MESSAGE (ADD PROD. PAGE) */
function addSuccessMessage(){
    let load = document.querySelector(".load-background");
    load.classList.remove("loading");
    let alertContent = document.querySelector(".successful-pInfo");
  let addAlertBox = document.querySelector(".alert-add-succ");
  
  addAlertBox.style.display = "block";
  addAlertBox.classList.add("alert-show");
  
  
  
  let exit = document.querySelector(".ok").onclick = ()=>{
      addAlertBox.style.display = "none";
      window.location.href = "homepage.html";
  }
}

/* STORE PRODUCTS FUNCTION */
function StorePDetails(){
    let PName = document.querySelector("#DName").value.trim();
    let PPrice = parseFloat(document.querySelector("#Dprice").value);
    let PQuantity = parseInt(document.querySelector("#Dquantity").value);
    
    
    const exists = medicines.some(med => med.name.toLowerCase() === PName.toLowerCase());
    
    if (!PName || !PPrice || !PQuantity) {
    alert("Please fill in all fields!");
    return;
}
    else if(exists){
        alert("Exists in inventory already");
    }
    else{
    class Drug{
        constructor(name,price,quantity){
            this.name = name;
            this.price = price;
            this.quantity = quantity;
        }
        }
        
        let addDrug = new Drug(PName,PPrice,PQuantity);
        medicines.push(addDrug);
        StoreMed();
        loading();
        setTimeout(addSuccessMessage,2000);
        return addDrug;
        }
    }
    
    
    let AddProductBtn = document.querySelector(".add-p-btn");
    
    if(AddProductBtn){
    AddProductBtn.onclick = ()=>{
        StorePDetails();
        calTotalQ();
    }
}



/* INVENTORY SECTION */

let Inventory = document.getElementById("inventory");

if(Inventory){
    Inventory.onclick = ()=>{
        loading();
        setTimeout(()=>{
            window.location.href = "inventory.html";
        },2000)
    }
}

/* NOTIFICATION SECTION ENTRY */
let notifyBtn = document.getElementById("lowQuantityAlert");

if (notifyBtn) {
    notifyBtn.onclick = () => {
        loading(); // Make sure this function exists
        setTimeout(() => {
            const notiPage = document.querySelector(".notificationSec");
            if (notiPage) {
                notiPage.style.display = "block";

                const notiHead = document.querySelector("#notif-head");
                if (notiHead){ notiHead.textContent = "NOTIFICATIONS";
                notiHead.style.color = "white";}
                

                let renderNoti = [];
                try {
                    const data = localStorage.getItem("LowProductQty");
                    if (data) {
                        renderNoti = JSON.parse(data);
                        if (!Array.isArray(renderNoti)) renderNoti = [renderNoti];
                    }
                } catch (err) {
                    console.error("Error parsing LowProductQty:", err);
                }

                const notiSec = document.querySelector(".notiSect");
                if (notiSec) {
                    notiSec.innerHTML = "";
                    

                    renderNoti.forEach(n => {
                        const p = document.createElement("p");
                        p.textContent = n;
                        p.id = "notiP";
                        p.style.width = "95%";
                        p.style.minHeight = "40px";
                        p.style.backgroundColor = "blue";
                        p.style.color = "white";
                        p.style.margin = "2px 0";
                        p.style.padding = "2px 5px";
                        p.style.position = "relative"; // zIndex works now
                        p.style.zIndex = "1";

                        notiSec.appendChild(p);
                    });
                }

            }
        }, 2000);
    };
}



/* FUNCTION THAT TAKES YOU BACK TO THE HOMEPAGE */
function returnHome(){
    setTimeout(()=>{
        window.location.href = "homepage.html"
    },300)
}

/* RETURN FOR HOMEPAGE */
let notiReturnHome = document.querySelector(".return");

if(notiReturnHome){
    notiReturnHome.onclick = ()=>{
        returnHome();
}
}


/* ADD EMPLOYEE ENTRY */
let addEmployeeBtn = document.getElementById("add-empl");

if(addEmployeeBtn){
    addEmployeeBtn.onclick = ()=>{
        loading();
        setTimeout(()=>{
            window.location.href = "approveEmpl.html";
        },2000);
    }
}


/* LOG OUT FUNCTION */
let logOutBtn = document.querySelector("#logout-btn");

if(logOutBtn){
    logOutBtn.onclick = ()=>{
        window.location.href = "index.html";
    }
}


/* APPROVED EMPLOYEES ENTRY FUNCTIONALITY */
let approvedEmplBtn = document.querySelector("#employees");

if(approvedEmplBtn){
    approvedEmplBtn.onclick = ()=>{
        loading();
        setTimeout(()=>{
            window.location.href = "employee.html";
        },2000);
    }
}


/* CHECKING IF USER IS ADMIN OR EMPLOYEE */
function homepageDetailing(){
    let homepage = document.querySelector(".homepage-body");
    

if(homepage){
    let renderEmplo = JSON.parse(localStorage.getItem("employees")) || [];
    let params = new URLSearchParams(window.location.search);
    let indexE = params.get("empIndex");
    let name = renderEmplo[indexE].firstName.toUpperCase();
    let TheRole = renderEmplo[indexE].role;
    
    
    let welcomeMess = document.querySelector(".admin-title");
    let description = document.querySelector(".description");
    let icons = document.querySelector(".admin-panel-icons");
    let actionIcons = document.querySelector(".actions");
    let searchBox = document.querySelector(".search");
    
    if(welcomeMess && description && icons && actionIcons && searchBox){
         if(TheRole == "employee"){
            welcomeMess.textContent = `WELCOME ${name} 🙂`;
            description.textContent = "";
            icons.innerHTML = "";
            icons.style.height = "max-content";
            actionIcons.innerHTML = "";
            actionIcons.style.height = "max-content";
            searchBox.style.marginTop = "-10px";
    }
        else{
            welcomeMess.textContent = `WELCOME ${name} 🙂`;
    }
    }
   
}
}

homepageDetailing();
