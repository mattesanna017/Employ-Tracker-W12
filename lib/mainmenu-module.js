const connectMysql = () =>{
    const mysql = require('mysql2');
    
    db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '67890',
        database: 'companyTracker_db'
    },
    console.log(`Server connected to the companyTracker_db database.`)
    );
    
}

const viewOurDepartments =() =>{
    db.query('SELECT * FROM department ', function (err, res) {
        console.log("\n")
        console.table(res);
});
}

const viewOurRoles =() =>{
    
    db.query('SELECT employee_role.title, employee_role.salary, department.department_name FROM employee_role INNER JOIN department on department.id = employee_role.department_id', function (err, res) {
        console.log("\n")
        console.table(res);
    });
}

const viewOurEmployees =() =>{
    db.query('SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.department_name, employee_role.salary, CONCAT(managers.first_name," ", managers.last_name) AS manager FROM department INNER JOIN employee_role ON department.id = employee_role.department_id INNER JOIN employee ON employee_role.id = employee.role_id LEFT JOIN employee AS managers on employee.manager_id = managers.id', function (err, res) {
        console.log("\n")
        console.table(res);
    });
}

const addDepartment = (response) =>{
    db.query(`INSERT INTO department (department_name) VALUES (?)`, response, function (err, res) {
        viewAllDepartments();
    });
}

const addRole =(title, salary, department_id) =>{
    db.query('INSERT INTO employee_role (title, salary, department_id) VALUES (?, ?, ?)',[title,salary,department_id], function (err, res) {
        console.log(res);
    });
}

const addEmployee =(first_name, last_name, role_id, manager_id) =>{
    db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',[first_name, last_name, role_id, manager_id] ,function (err, res) {
        console.log(res);
    });
}

const updateEmployeeRole =(newTitle,newEmployeeID) =>{
    db.query('UPDATE employee INNER JOIN employee_role ON employee.role_id= employee_role.id SET employee.role_id = ? WHERE employee.id= ?',[newTitle, newEmployeeID], function (err, res) {
        console.log(res);
    });
}

module.exports = {connectMysql, viewOurDepartments, viewOurRoles, viewOurEmployees, addDepartment,addRole, addEmployee, updateEmployeeRole} ;