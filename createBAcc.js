let businessDetailSection = document.querySelector(".business-details");
    let businessOwnerDetailSection = document.querySelector(".Owner-details");
    let description = document.querySelector(".content");
    let dismissArticle = document.querySelector(".dismiss-article");
    
    let heading = document.querySelector(".header");
    
     

/* HIDES THE SECOND SECTION UNTIL WHEN THE NEXT BUTTON IS CLICKED */
document.addEventListener("DOMContentLoaded",()=>{
    let detailsR = JSON.parse(localStorage.getItem("businessDetails")) || [];
    if(detailsR.length != 0){
            businessDetailSection.style.display = "none";
            dismissArticle.style.display = "none";
            description.textContent = "Admin Details";
        
    }
    else{
        businessOwnerDetailSection.style.display = "none";
        dismissArticle.style.display = "none";
    }
   
    
})

/* FUNCTION THAT CHECKS FOR EMPTY INPUT */
function check(input,errorP,err,errL){
    if(input.value === ""){
        errorP.textContent = err;
        return false;
    }
    else if(input.value.length <= 2){
        errorP.textContent = errL;
    }
    else{

        errorP.textContent = "";
        return true;
    }
}

/* BUSINESS DETAILS OBJECT */
class businessD{
    constructor(BName,BOwner,BAbout,BAddress,BCategory,BEmail,BNumber){
        this.businessName = BName;
        this.businessOwner = BOwner;
        this.about = BAbout;
        this.businessAddress = BAddress;
        this.businessCategory = BCategory;
        this.businessEmail = BEmail;
        this.businessNumber = BNumber;
    }
}

/* INDIVIDUAL CHECKING */
function checkAll(){
    let businessName = document.querySelector(".businessN");
    let businessOwner = document.querySelector(".BusinessOwnerN");
    let businessAbout = document.querySelector(".about");
    let businessAddress = document.querySelector(".BusinessA");
    let businessCategory = document.querySelector(".BusinessC");
    let businessEmail = document.querySelector(".BusinessE");
    let businessNumber = document.querySelector(".BusinessN");
    
    let errorNameParagraph = document.querySelector("#BN-error");
    let errOwner = document.querySelector("#BOwnerN-error");
    let errAbout = document.querySelector("#AB-error");
    let errAddress = document.querySelector("#BA-error");
    let errCategory = document.querySelector("#BC-error");
    let errEmail = document.querySelector("#BE-error");
    let errNumber = document.querySelector("#BNu-error");
    
    let validateBN = check(businessName,errorNameParagraph,"*Input cannot be left empty...","*Input must be at least three characters...");
    
    let validateBOwner = check(businessOwner,errOwner,"*Input cannot be left empty...","*Input must be at least three characters...");
    
    let validateAB = check(businessAbout,errAbout,"*Input cannot be left empty...","*Input must be at least three characters...");
    
    let validateBA = check(businessAddress,errAddress,"*Input cannot be left empty...","*Input must be at least three characters...");
    
    let validateBC = check(businessCategory,errCategory,"*Input cannot be left empty...","*Input must be at least three characters...");
    
    let validateBE = check(businessEmail,errEmail,"*Input cannot be left empty...","*Input must be at least three characters...");
    
    let validateBNu = check(businessNumber,errNumber,"*Input cannot be left empty...","*Input must be at least three characters...");
    
    if(validateBOwner && validateAB && validateBA &&  validateBC && validateBE && validateBNu){
        let details = JSON.parse(localStorage.getItem("businessDetails")) || [];
        
        let allDetails = new businessD(businessName.value.trim(),businessOwner.value.trim(),businessAbout.value.trim(),businessAddress.value.trim(),businessCategory.value.trim(),businessEmail.value.trim(),businessNumber.value.trim());
        
        details.push(allDetails);
       alert("saving");
        localStorage.setItem("businessDetails",JSON.stringify(details));
        
        businessDetailSection.innerHTML = "";
        description.textContent = "";
        businessDetailSection.innerHTML = "Loading...";
        setTimeout(()=>{
            businessDetailSection.innerHTML = "";
            description.textContent = "Admin Details";
            businessOwnerDetailSection.style.display = "flex";
            
            
        },3000);
        
        
    }
    
}


let nextBtn = document.querySelector("#Next");

if(nextBtn){
    nextBtn.onclick = ()=>{
        checkAll();
    }
}





/* THE CREATE ACCOUNT(THE OWNER DETAILS SECTION FUNCTIONALITY) */

/* Id generating function */
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


function validate(input,ErrorMessageCont,minLength,inputErrMess,minLengthErrMess){
    if(input.value === ""){
        ErrorMessageCont.textContent = inputErrMess;
        return false;
    }
    else if(input.value.length < minLength){
        ErrorMessageCont.textContent = minLengthErrMess;
        return false;
    }
    else{
        ErrorMessageCont.textContent = "";
        return true;
        
    }
}


class InputValues{
    constructor(firstName,lastName,age,gender,email,phoneNumber,state, password,id,role){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.state = state;
        this.password = password;
        this.id = id;
        this.role = role;
    }
}


/* INPUT DECLARATIONS */
let firstNInput = document.querySelector(".firstN");
let lastNInput = document.querySelector(".lastN");
let ageInput = document.querySelector(".Age");
let phoneNInput = document.querySelector(".phoneNum");
let stateInput = document.querySelector(".state");
let passInput = document.querySelector(".password");
let confirmPassInput = document.querySelector(".confirmPass");
let genderInput = document.querySelector(".gender");
let emailInput = document.querySelector(".email");


/* ERROR PARAGRAPHS */
let errorFN = document.querySelector("#FN-error");
let errorLN = document.querySelector("#LN-error");
let errorAge = document.querySelector("#age-error");
let errorPN = document.querySelector("#PN-error");
let errorState = document.querySelector("#state-error");
let errorPass = document.querySelector("#pass-error");
let errorCP = document.querySelector("#CP-error");
let errorGender = document.querySelector("#gender-error");
let errorEmail = document.querySelector("#email-error");


/* CREATE ACCOUNT BUTTON FUNCTIONALITY */
let correct = true;
let emailValid = true;
let CreateBtn = document.querySelector("#create");

if(CreateBtn){
    CreateBtn.onclick = ()=>{
        let validFN = validate(firstNInput,errorFN,2,"*Input first name to continue...","*Must be atleast two characters...");
        let validLN = validate(lastNInput,errorLN,2,"*Input last name to continue...","*Must be atleast two characters...");
        let validAge = validate(ageInput,errorAge,2,"*Input your Age to continue...","*Must be atleast two characters...");
        let validGender = validate(emailInput,errorEmail,4,"*Input your correct email to continue...","*Must be atleast four characters...");
        
        let validPN = validate(phoneNInput,errorPN,5,"*Input your Phone number to continue...","*Must be atleast five numbers...");
        let validState = validate(stateInput,errorState,2,"*Input your State to continue...","*Must be atleast two characters...");
        let validPass = validate(passInput,errorPass,6,"*Input password to continue...","*Must be atleast six characters...");
        
        /* Rendering employees already approved to check for password and email existence */
        let Emp =             JSON.parse(localStorage.getItem("employees")) || [];
        
        /* EMAIL VALIDATION */
        const emailExist = Emp.some(Em => Em.email === emailInput.value.toLowerCase());
        
        if(emailInput.value === ""){
            errorEmail.textContent = "*Input your email to continue...";
            emailValid = false;
        }
        else if(emailInput.value.length < 4){
            errorEmail.textContent = "*Email must include @";
            emailValid = false;
        }
        else if(emailExist){
            errorEmail.textContent = "*Account with this email already exists,try using another email...";
            emailValid = false;
        }
        else{
            errorEmail.textContent = "";
            emailValid = true;
        }
        
        
        
        /* CONFIRM PASSWORD INPUT VALIDATION */
        let existingPass = Emp.some(p => p.password === confirmPassInput.value.toLowerCase());
        
        if(confirmPassInput.value === ""){
            errorCP.textContent = "*Confirm password to continue...";
            correct = false;
        }
        else if(confirmPassInput.value.length < 6){
            errorCP.textContent = "*password must be atleast six characters...";
            correct = false;
        }
        else if(confirmPassInput.value != passInput.value ){
            errorCP.textContent = "*Your confirm password must be the same with your password...";
            correct = false;
        }
        else if(existingPass){
            errorCP.textContent = "*Your password have been already used by another user...";
            errorPass.textContent = "*Your password have been already used by another user...";
            correct = false;
        }
        else{
            errorCP.textContent = "";
            errorPass.textContent = "";
            correct = true;
        }
        
        
        
        if(validFN && validLN && validAge && validGender &&  emailValid === true && validPN && validState && validPass && correct === true ){
        CreateBtn.textContent = "Creating...";
        setTimeout(()=>{
            let emplFN = firstNInput.value.trim().toLowerCase();
        let emplLN = lastNInput.value.trim().toLowerCase();
        let emplAge = ageInput.value.trim().toLowerCase();
        let emplGender = genderInput.value.trim().toLowerCase();
        let emplPN = phoneNInput.value.trim().toLowerCase();
        let emplState = stateInput.value.trim().toLowerCase();
        let emplEmail = emailInput.value.trim().toLowerCase();
        let emplPass = confirmPassInput.value.trim().toLowerCase();
        callId();
        
            let admins = new InputValues(emplFN,emplLN,emplAge,emplGender,emplEmail,emplPN,emplState,emplPass,Id,"admin");
            
            let adminR = JSON.parse(localStorage.getItem("employees")) || [];
            adminR.push(admins);
            
            localStorage.setItem("employees",JSON.stringify(adminR));
            
            let ownerDetails = JSON.parse(localStorage.getItem("businessDetails")) || [];
            ownerDetails.push(admins);
            localStorage.setItem("businessDetails",JSON.stringify(ownerDetails));
            
            firstNInput.value = "";
            lastNInput.value = "";
            ageInput.value = "";
            phoneNInput.value = "";
            stateInput.value = "";
            passInput.value = "";
            confirmPassInput.value = "";
            genderInput.value = "";
            emailInput.value = "";
            
            
            
            CreateBtn.textContent = "Account Created";
        },4000);
        
        setTimeout(()=>{
            businessOwnerDetailSection.innerHTML = "";
            let employeeDatabase = JSON.parse(localStorage.getItem("employees")) || [];
            let adminId = employeeDatabase[0].id;
            let adminNa = employeeDatabase[0].firstName.toUpperCase();
            heading.textContent = `Congratulations ${adminNa} 🎉`;
            description.textContent = `Your account have being created successfully 😁,Below Is Your Id\n`;
            
            businessOwnerDetailSection.innerHTML = `<h1>${adminId}<h1>`;
            businessOwnerDetailSection.innerHTML += `Note:keep your Id safe as its one of the major requirements to log in your account`
            
            dismissArticle.style.display = "flex";
            dismissBtn = document.querySelector("#dismiss");
            if(dismissBtn){
                dismissBtn.onclick = ()=>{
                    dismissBtn.textContent = "Loading...";
                    setTimeout(()=>{
                        window.location.href = "index.html";
                    },500);
                    
                    
                }
            }
        },5000)
        
        }
        
        
    }
    
    
    
}

