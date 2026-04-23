document.addEventListener("DOMContentLoaded",()=>{

let loginBody = document.querySelector(".page-title");
if(loginBody){
    run();
}  
})



function run(){
    let EmpRender =             JSON.parse(localStorage.getItem("employees")) || [];
    
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

let totalEmp =             JSON.parse(localStorage.getItem("employees")) || [];


function firstNameValidating(input,nameIndex){
    if(input.value.trim().toLowerCase() === ""){
            alert("input username to continue");
            correctName = false;
        }
        else if(input.value.trim().toLowerCase() !== totalEmp[nameIndex].firstName){
            alert("Invalid username");
            correctName = false;
        }
        else{
            correctName = true;
        }
}

function passValidating(pasInput,passIndex){
    if(pasInput.value.trim().toLowerCase() === ""){
            alert("Input password to continue.. ");
            correctPass = false;
        }
        else if(pasInput.value.trim().toLowerCase() !== totalEmp[passIndex].password){
            alert("Invalid password!");
            correctPass = false;
        }
        else{
            correctPass = true;
        }
}

/* LOGIN FUNCTIONALITY */
function authenticating(){
    
    let userId = document.querySelector(".user-id");
    let userName = document.querySelector(".user-name");
    let userPass = document.querySelector(".user-pass");
    
    totalEmp.forEach(a =>{if(userId.value.trim() == a.id ){
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
                    window.location.href = `homepage.html?name=${userName.value.toLowerCase()}&id=${userId.value.toLowerCase()}&role=${a.role}`;
                },5000);
                
            }
        }
         /* end */
      }
      
    
    })
    
}




let loginBtn = document.querySelector(".login");

if(loginBtn){
    loginBtn.onclick = ()=>{
    let usId = document.querySelector(".user-id");
    let found = "false";
    let exists = totalEmp.some(UId =>{String(UId.id) === usId.value.trim(); return true;});
    
        
        if(usId.value === ""){
            alert("input Id to continue...");
            return;
        }
        
        
        if(exists && usId != ""){
            authenticating();
            
        }
        else{
            alert("USER NOT FOUND!");
            console.log(totalEmp);
            return;
            
        }
    }
}


