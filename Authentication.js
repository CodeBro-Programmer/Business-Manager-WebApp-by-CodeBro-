let body = document.querySelector("#approveEmpl-body");

function generateId(){
    let code = "";
    let cond = 3;
    for(let i =0; i< cond; i++){
    let genId = Math.floor(Math.random()*9);
    code += genId;
    }

    let finalId = "0" + code;
    Id = finalId;
}

let Id = "";

function callId(){
    generateId();
    let E = JSON.parse(localStorage.getItem("employees")) || [];
    let response = E.some(a=>{a.id == Id});
    
    if(response){
        generateId();
    }
}


function btnLoad(button){
    if(button){
        button.classList.add("display-load");
    }
}


/* RENDERING PENDING EMPLOYEES IN THE APPROVE EMPLOYEE SECTION */
if(body){
renderPendingEmpl();
function renderPendingEmpl(){
    let cont = document.querySelector(".approve-container");
    let Render = JSON.parse(localStorage.getItem("pendingEmpl")) || [];
    cont.innerHTML = "";

Render.forEach((empl,index)=>{cont.innerHTML+=`<section class="approveEmpl-cont"><div class="prop">
            <label class="label">Fisrt Name:</label>
            <p class="emplFN">${empl.firstName}</p>
        </div>
        
        <div class="prop">
            <label class="label">Last Name:</label>
            <p class="emplLN">${empl.lastName}</p>
        </div>
        
        <div class="prop">
            <label class="label">Age:</label>
            <p class="emplAge">${empl.age}</p>
        </div>
        
        <div class="prop">
            <label class="label">Gender:</label>
            <p class="emplGender">${empl.gender}</p>
        </div>
        
        <div class="prop">
            <label class="label">State Of Origin:</label>
            <p class="emplState">${empl.state}</p>
        </div>
        
         <div class="prop">
            <label class="label">Email:</label>
            <p class="emplEmail">${empl.email}</p>
        </div>
        
        <div class="prop">
            <label class="label">Phone Number:</label>
            <p class="emplNum">${empl.phoneNumber}</p>
        </div>
        
        <div class="prop">
            <label class="label">Password:</label>
            <p class="emplPass">${empl.password}</p>
        </div>
        
        <div class="approveEmpl-buttons">
            <button class="decline" data-index = ${index}><p id="textD">Decline</p>
            <div class="btn-load"></div>
            </button>
            <button class="approve" data-index = ${index}>Approve Employee
             </button>
        </div></section>`
})
}
    
}


/* SAVED EMPLOYEE OBJECT TEMPLATE */
class Employees{
    constructor(firstName,lastName,age,gender,state, email,phoneNumber,password,id,role){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.state = state;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.id = id;
        this.role = role;
        
    }    
}


/* APPROVE OR DECLINE PENDING EMPLOYEE CODE */
let approveSectionBody = document.querySelector("#approveEmpl-body");

if(approveSectionBody){
    let approveIndex = "";
    
    
    approveSectionBody.addEventListener('click',(e)=>{
    
            let RenderPEmpl = JSON.parse(localStorage.getItem("pendingEmpl")) || [];
    
         /* APPROVE PENDING EMPLOYEE */
        if(e.target.classList.contains("approve")){
             approveIndex = Number(e.target.dataset.index);
             callId();
             
             
             if(Id != ""){
                 let FN = RenderPEmpl[approveIndex].firstName;
             let LN = RenderPEmpl[approveIndex].lastName;
             let age = RenderPEmpl[approveIndex].age;
             let gender = RenderPEmpl[approveIndex].gender;
             let state = RenderPEmpl[approveIndex].state;
             let email = RenderPEmpl[approveIndex].email;
             let PN = RenderPEmpl[approveIndex].phoneNumber;
             let pass = RenderPEmpl[approveIndex].password;
             
             let approveBtn = document.querySelector(".approve");
             
             
             let approvedEmpl = new Employees(FN,LN,age,gender,state,email,PN,pass,Id,"employee");
             console.log(Id);
             
             
               let parseEmp =             JSON.parse(localStorage.getItem("employees")) || [];
                parseEmp.push(approvedEmpl);
                   localStorage.setItem("employees",JSON.stringify(parseEmp)); 
                   
                   
                if(approveBtn){
                     approveBtn.textContent = "Approving...";
                }
                
                
                setTimeout(()=>{
                    if(approveBtn){
                       approveBtn.textContent = "Approved ✔️";
                    }
                },2000);
                
                setTimeout(()=>{
                    if(approveBtn){
                       approveBtn.textContent = "Adding Employee...";
                    }
                },3000);
                
                
                setTimeout(()=>{
                    RenderPEmpl.splice(approveIndex,1);
 localStorage.setItem("pendingEmpl",JSON.stringify(RenderPEmpl));
                renderPendingEmpl();
                },4000);
                
             }
             else{
                 alert("ID WASN'T GENERATED");
             }
             
                
               /*  console.log("active");
                console.log(parseEmp);
                alert("save successful ✔️😁"); */
                
        }
        
       
       /* DECLINE PENDING EMPLOYEE */
        if(e.target.classList.contains("decline")){
            let declIndex = Number(e.target.dataset.index);
            let declineBtn = document.querySelector(".decline");
            
            if(declineBtn){
                declineBtn.textContent = "Declined ✖️"
            }
            
            setTimeout(()=>{
                    if(declineBtn){
                       RenderPEmpl.splice(declIndex,1);
 localStorage.setItem("pendingEmpl",JSON.stringify(RenderPEmpl));
                renderPendingEmpl();
                    }
                },2000);
            
        }
    })
}





















