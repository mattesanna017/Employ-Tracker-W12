INSERT INTO department (department_name)
VALUES  ("Inbound"),
        ("Stock Control"),
        ("Sortation");


INSERT INTO employee_role (title, salary, department_id)
VALUES      ("Section Manager", 27000, 11),
            ("Team Leader", 22500, 21),
            ("Admin", 18500, 31);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES      ("Edoardo", "Secreto", 8941, 6 ),
            ("Peter", "Nagy", 8942, 7),
            ("Patricia", "Germanova", 8943, 8)
            ("Weronika", "Borowanska", 8951, NULL),
            ("Estefany", "Murillo", 8952, NULL),
            ("Dominik", "Kranoski", 8953, NULL)
            ("Marco", "Vieira", 8961, NULL),
            ("Fiori", "Zemikal", 8962, NULL)
            ("Jonh", "Disab", 8963, NULL),
            ("Alexandra", "Pantilescu", 8964, NULL),
            ("Raffaele", "De Luca", 8965, NULL),
            ("Kasete", "Goitom", 8966, NULL);






