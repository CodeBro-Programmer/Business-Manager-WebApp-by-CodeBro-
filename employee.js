/* RENDERING FUNCTION */
function renderEmp(){
        /* localStorage.removeItem("employees"); */
        employeeList.innerHTML = "Loading...";
        setTimeout(()=>{
        employeeList.innerHTML = "";
            let allEmp =             JSON.parse(localStorage.getItem("employees")) || [];
        
        allEmp.forEach((e,index)=>{employeeList.innerHTML += `<div class="table-row">
    <span class="ID">${e.id}</span>
    <span class="name">${e.firstName} ${e.lastName}</span>
    <span class="email">${e.email}</span>
    <span class="role">${e.role}</span>
    <span class="actions">
      <button data-index = ${index} class="make-admin">Make Admin</button>
      <button data-index = ${index} class="delete">Delete</button>
    </span>
  </div>`
})
        },3000)
        
    }


let employeeList = document.querySelector("#employee-list");


if(employeeList){ 
    renderEmp();
    
    
    employeeList.addEventListener('click',(e)=>{
    
    let Emp =             JSON.parse(localStorage.getItem("employees")) || [];
    
    
    /* MAKE EMPLOYEE ADMIN FUNCTIONALITY */
        if(e.target.classList.contains("make-admin")){
            const makeAIndex = Number(e.target.dataset.index);
            
            Emp[makeAIndex].role = "Admin";
            localStorage.setItem("employees",JSON.stringify(Emp));
            renderEmp();
            
        }
        
        
        /* DELETE EMPLOYEE FUNCTION */
        if(e.target.classList.contains("delete")){
            const delIndex = Number(e.target.dataset.index);
            Emp.splice(delIndex,1);
                     localStorage.setItem("employees",JSON.stringify(Emp));
            renderEmp(); 
        }
    })
}


