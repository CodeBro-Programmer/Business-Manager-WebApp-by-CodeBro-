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

/* OBJECT */
class InputValues{
    constructor(firstName,lastName,age,gender,email,phoneNumber,state, password){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.state = state;
        this.password = password;
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


/* SIGN UP BUTTON */
let correct = true;
let emailValid = true;
let signUpBtn = document.querySelector("#Sign-Up");

if(signUpBtn){
    signUpBtn.onclick = ()=>{
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
        signUpBtn.textContent = "Signing Up...";
        setTimeout(()=>{
            let emplFN = firstNInput.value.trim().toLowerCase();
        let emplLN = lastNInput.value.trim().toLowerCase();
        let emplAge = ageInput.value.trim().toLowerCase();
        let emplGender = genderInput.value.trim().toLowerCase();
        let emplPN = phoneNInput.value.trim().toLowerCase();
        let emplState = stateInput.value.trim().toLowerCase();
        let emplEmail = emailInput.value.trim().toLowerCase();
        let emplPass = confirmPassInput.value.trim().toLowerCase();
        
            let pendingEmployee = new InputValues(emplFN,emplLN,emplAge,emplGender,emplEmail,emplPN,emplState,emplPass);
            
            let pendingEmployeeRender = JSON.parse(localStorage.getItem("pendingEmpl")) || [];
            pendingEmployeeRender.push(pendingEmployee);
            localStorage.setItem("pendingEmpl",JSON.stringify(pendingEmployeeRender));
            firstNInput.value = "";
            lastNInput.value = "";
            ageInput.value = "";
            phoneNInput.value = "";
            stateInput.value = "";
            passInput.value = "";
            confirmPassInput.value = "";
            genderInput.value = "";
            emailInput.value = "";
            
            
            console.log("saved 🙂 👨‍💻 ");
            signUpBtn.textContent = "Sign-up";
        },4000);
        
        setTimeout(()=>{
            window.location.href = "Alert.html";
        },5000)
        
        }
        
        
    }
    
    
    
}




