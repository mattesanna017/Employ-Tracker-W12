INSERT INTO department (department_name)
VALUES ("Inbound"),
       ("Stock Control");

  
INSERT INTO employee_role (title, salary, department_id)
VALUES ("Section Manager", 28000,1),
       ("Team Leader", 25000,2);
       

       

INSERT INTO employee (first_name, last_name, role_id, manager_id)     
VALUES ("Kasete", "Goitom", 2, 2),
       ("Edoardo", "Secreto", 1, NULL),
       ("James", "Barnes", 2, 2);
    
    