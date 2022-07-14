const {connectMysql, viewOurDepartments, viewOurRoles, viewOurEmployees, addDepartment,addRole, addEmployee, updateEmployeeRole} = require('./lib/menu-module'); 

function questionnaire(){


    const inquirer = require('inquirer');
    const companyDepartments=[];
    const companyRoles=[];
    const companyEmployeeNames=[{value:0, name:"NONE"}];
    
    inquirer
     .prompt([
        {
        type: "list",
        name:"menu",
        message: "SELECT AN OPTION TO CONTINUE:",
        choices: ["View our Departments","View our Roles","View our Employees", "Add new Department","Add new Role","Add new Employee","Update Employee Role", "Close Shell"],
    },
    
]) 
    .then((answer) => {
        if (answer.menu == "View our Departments"){
            viewOurDepartments().then(([rows] )=> {
            console.table(rows);
            console.log('\n')
            questionnaire();
            });
        }
        if (answer.menu == "View our Roles"){
            viewOurRoles().then(([rows] )=> {
                console.table(rows);
                console.log('\n')
                questionnaire();
                });
        }
        if (answer.menu == "View our Employees"){
            viewOurEmployees().then(([rows] )=> {
                console.table(rows);
                console.log('\n')
                questionnaire();
                });
        }
        if (answer.menu == "Add new Department"){
            addDepartmentSelection()
        }
        if (answer.menu == "Add new Role"){
            renderCompanyDepartments()
            addRoleSelection()
        }
        if (answer.menu == "Add new Employee"){
            renderCompanyEmployees()
            renderCompanyRoles()
            addEmployeeSelection()
        }
        if (answer.menu == "Update Employee Role"){
            renderCompanyEmployees()
            renderCompanyRoles()
            updateEmployeeSelection()
        }
        if (answer.menu == "Close Shell"){
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
    
        .then ((answers) => {
            addDepartment(answers.new_department)
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
        .then ((answers) => {

            db.query('SELECT * FROM department ', function (err, results) {
                for (i=0; i< results.length; i++){
                if(results[i].department_name == answers.add_department){
                    department_id=results[i].id
                    addRole(answers.new_role, answers.add_salary, department_id)
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
        .then ((answers) => {   
                  
            addEmployee(answers.add_new_firstname, answers.add_new_lastname, answers.add_newemployee_role, answers.add_newemployee_manager)    

            questionnaire()
        })
    }

    let updateEmployeeSelection = () =>{ 
        inquirer
        .prompt([
            {
            type: "input",   
            name:"updated_credentials",
            message: "Please enter the updated credentials",
            },

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
    
        .then ((answers) => {   
            console.log(answers.role_update)
            console.log(answers.employee_update)
            updateEmployeeRole(answers.role_update, answers.employee_update)

            questionnaire()
        })
    }

    let renderCompanyDepartments =() =>{
        db.query('SELECT * FROM department ', function (err, results) {
            for (i=0; i< results.length; i++){
                companyDepartments.push(results[i].department_name)
            }           
        })
    }

    
    let renderCompanyRoles =() =>{
        db.query('SELECT id as value, title as name FROM employee_role ', function (err, results) {
        
            let renderList=[];
            
            for(i=0; i< results.length; i++){
                renderList.push(results[i])
            }
            
            for (i=0; i< results.length; i++){
                let renderName = renderList.pop()
                companyRoles.push(renderName)
            }
        })
    }

    let renderCompanyEmployees =() =>{
        db.query("SELECT id as value, CONCAT(first_name, ' ', last_name) as name FROM employee", function (err, results) {  
        
            let renderList=[];
            
            
            for(i=0; i< results.length; i++){
                renderList.push(results[i])
            }
            
            for (i=0; i< results.length; i++){
                let renderName = renderList.pop()
                companyEmployeeNames.push(renderName)
            }
        })
    }
   
}

connectMysql()

questionnaire()