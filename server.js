const {connectMysql, viewOurDepartments, viewOurRoles, viewOurEmployees, addDepartment,addRole, addEmployee, updateEmployeeRole} = require('./lib/home-module'); 

function questionnaire(){


    const inquirer = require('inquirer');
    const companyDepartments=[];
    const companyRoles=[];
    const companyEmployeeNames=[{value:0, name:"NONE"}];
    
    inquirer
     .prompt([
        {
        type: "list",
        name:"home",
        message: "Select an option to continue:",
        choices: ["View our Departments","View our Roles","View our Employees", "Add new Department","Add new Role","Add new Employee","Update Employee Role","Close Terminal"],
    },
    
]) 
    .then((response) => {
        if (response.home == "View our Departments"){
            viewOurDepartments()    
            questionnaire()
        }
        if (response.home == "View our Roles"){
            viewOurRoles()    
            questionnaire()
        }
        if (response.home == "View our Employees"){
            viewOurEmployees()    
            questionnaire()
        }
        if (response.home == "Add new Department"){
            addDepartmentSelection()
        }
        if (response.home == "Add new Role"){
            renderCompanyDepartments()
            addRoleSelection()
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
                }
                }
            });
    
         
            
        })
    }




}

connectMysql()

questionnaire()