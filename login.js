document.addEventListener("DOMContentLoaded",()=>{

let loginBody = document.querySelector(".page-title");
if(loginBody){
    run();
}  
})



function run(){
    let EmpRender = JSON.parse(localStorage.getItem("employees")) || [];
    
    if(EmpRender.length == 0){
        createAccountDirectory();
        let btn = document.querySelector(".createAcc");
        if(btn){
            btn.onclick = ()=>{
                btn.textContent = "Loading...";
                setTimeout(()=>{
                    window.location.href = "createBAcc.html";
                },600);
            }
        }
    }
}


function createAccountDirectory(){
    let createAccBody = document.querySelector(".create-account-body");
        createAccBody.style.display = "flex";
    createAccBody.classList.add("create-acc");
    
}
 
 
let correctName = true;
let correctPass = true;
let notFoundId = true;

let totalEmp = JSON.parse(localStorage.getItem("employees")) || [];


function firstNameValidating(input,nameIndex){
let errorFN = document.querySelector(".errorFirstN");
    if(input.value.trim().toLowerCase() === ""){
            errorFN.textContent = "*Input first-name to continue...";
            correctName = false;
        }
        else if(input.value.trim().toLowerCase() !== totalEmp[nameIndex].firstName){
            errorFN.textContent = "*This first-name is incorrect...";
            correctName = false;
        }
        else{
            errorFN.innerHTML = "";
            correctName = true;
        }
}

function passValidating(pasInput,passIndex){
let errorPas = document.querySelector(".errorPass");
    if(pasInput.value.trim().toLowerCase() === ""){
            errorPas.textContent = "*Input password to continue.. ";
            correctPass = false;
        }
        else if(pasInput.value.trim().toLowerCase() !== totalEmp[passIndex].password){
            errorPas.textContent = "*Incorrect password...";
            correctPass = false;
        }
        else{
            errorPas.innerHTML = "";
            correctPass = true;
        }
}

/* LOGIN FUNCTIONALITY */
let errIdP = document.querySelector(".errorId");


function authenticating(){
    
    let userId = document.querySelector(".user-id");
    let userName = document.querySelector(".user-name");
    let userPass = document.querySelector(".user-pass");
    
    
    totalEmp.forEach(a =>{if(userId.value.trim() == a.id ){
        notFoundId = false;
        errIdP.innerHTML = "";
        let index = totalEmp.findIndex(user => user.id === userId.value.trim());
        
       /* USERNAME AUTHENTICATION */ 
        firstNameValidating(userName,index);
        
        /* PASSWORD AUTHENTICATION */
        passValidating(userPass,index)
        
        /* CORRECT CREDENTIALS FUNCTIONALITY */
        if(correctName === true && correctPass === true){
            let loginB = document.querySelector(".login");
            if(loginB){
                loginB.textContent = "Authenticating...";
                
                setTimeout(()=>{
                    loginB.textContent = "Access Granted 🔓";
                },3000);
                
                setTimeout(()=>{
                    window.location.href = `homepage.html?empIndex=${index}`;
                },5000);
                
            }
        }
        }
         /* end */
      
    
    })
    
}




let loginBtn = document.querySelector(".login");
let clicked = true;

if(loginBtn){
    loginBtn.onclick = ()=>{
    let usId = document.querySelector(".user-id");
    let found = "false";
    let exists = totalEmp.some(UId =>{String(UId.id) === usId.value.trim(); return true;});
    
        
        if(usId.value === ""){
            errIdP.textContent = "*Input Id to continue...";
            return;
        }
        
        
        if(clicked === true){
            authenticating();
            if(notFoundId){
                errIdP.textContent = "*Account with Id does not Exist!";
            }
            
        }
    }
}


