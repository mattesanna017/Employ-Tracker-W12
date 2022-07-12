const {connectMysql, viewOurDepartments, viewOurRoles, viewOurEmployees, addDepartment,addRole, addEmployee, updateEmployeeRole} = require('./lib/mainmenu-module'); 

function questionnaire(){


    const inquirer = require('inquirer');
    const companyDepartments=[];
    const companyRoles=[];
    const companyEmployeeNames=[{value:0, name:"NONE"}];
    
    inquirer
     .prompt([
        {
        type: "list",
        name:"mainmenu",
        message: "Select an option to continue:",
        choices: ["View our Departments","View our Roles","View our Employees", "Add new Department","Add new Role","Add new Employee","Update Employee Role","Close Terminal"],
    },
    
]) 
    .then((response) => {
        if (response.mainmenu == "View our Departments"){
            viewOurDepartments()    
            questionnaire()
        }
        if (response.mainmenu == "View our Roles"){
            viewOurRoles()    
            questionnaire()
        }
        if (response.mainmenu == "View our Employees"){
            viewOurEmployees()    
            questionnaire()
        }
        if (response.mainmenu == "Add new Department"){
            addDepartmentSelection()
        }
        if (response.mainmenu == "Add new Role"){
            renderCompanyDepartments()
            addRoleSelection()
        }
        if (response.mainmenu == "Add new Employee"){
            renderCompanyEmployees()
            renderCompanyRoles()
            addEmployeeSelection()
        }
        if (response.mainmenu == "Update Employee Role"){
            renderCompanyEmployees()
            renderCompanyRoles()
            updateEmployeeSelection()
        }
        if (response.mainmenu == "Close Terminal"){
            process.exit();
        }
    })

    let addDepartmentSelection  = () =>{
        inquirer
        .prompt([
            {
            type: "input",
            name:"new_department",
            message: "What is the name of the new department?"
            },
        ]) 
    
        .then ((response) => {
            addDepartment(response.new_department)
            questionnaire()  
        })
    }

    let addRoleSelection  = () =>{
        inquirer
        .prompt([
            {
            type: "input",
            name:"new_role",
            message: "What is the name of new the role?"
            },

            {
            type: "input",
            name:"add_salary",
            message: "What is the salary of the new role?"
            },

            {
            type: "list",
            name:"add_department", 
            message: "Which department does the new role belong to?",
            choices: companyDepartments,
            },
        ]) 
        .then ((response) => {

            db.query('SELECT * FROM department ', function (err, res) {
                for (i=0; i< res.length; i++){
                if(res[i].department_name == response.add_department){
                    department_id=res[i].id
                    addRole(response.new_role, response.add_salary, department_id)
                    questionnaire()
                }}
            })
         })
    }

    let addEmployeeSelection  = () =>{
        inquirer
        .prompt([
            {
            type: "input",
            name:"add_new_firstname",
            message: "What is the new employee's first name?"
            },

            {
            type: "input",
            name:"add_new_lastname",
            message: "What is the new employee's last name?"
            },

            {
            name:"add_newemployee_role",
            type: "list",
            message: "What is the new employee's role?",
            choices: companyRoles,
            },

            {
            type: "list",
            name:"add_newemployee_manager",
            message: "Who is the new  employee's manager?",
            choices: companyEmployeeNames,
            },
        ])  
        .then ((response) => {   
                  
            addEmployee(response.add_new_firstname, response.add_new_lastname, response.add_newemployee_role, response.add_newemployee_manager)    

            questionnaire()
        })
    }

    let updateEmployeeSelection = () =>{ 
        inquirer
        .prompt([

            {
            type: "list",
            name:"employee_update",
            message: "Select an employee to update his/her role:",
            choices: companyEmployeeNames,
            },

            {type: "list",
            name:"role_update",
            message: "Assign a new role to the selected employee:",
            choices: companyRoles,
            },
        ]) 
    
        .then ((response) => {   
            console.log(response.role_update)
            console.log(response.employee_update)
            updateEmployeeRole(response.role_update,response.employee_update)

            questionnaire()
        })
    }

    




}

connectMysql()

questionnaire()