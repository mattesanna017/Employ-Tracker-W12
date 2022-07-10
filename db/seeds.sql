INSERT INTO department (department_name)
VALUES  ('Inbound'),
        ('Stock Control'),
        ('Sortation');


INSERT INTO employee_role (title, salary, department_id)
VALUES      ('Section Manager', 27000, 11),
            ('Team Leader', 22500, 11),
            ('Admin', 18500, 11);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES      ('Edoardo', 'Secreto', 22, 5 ),
            ('Peter', 'Nagy', 22, 5 ),
            ('Patricia', 'Germanova', 22, 5),
            ('Weronika', 'Borowanska', 22, NULL),
            ('Estefany', 'Murillo', 22, NULL),
            ('Dominik', 'Kranoski', 22, NULL),
            ('Marco', 'Vieira', 22, NULL),
            ('Fiori', 'Zemikal', 22, NULL),
            ('Jonh', 'Disab', 22, NULL),
            ('Alexandra', 'Pantilescu', 22, NULL),
            ('Raffaele', 'De Luca', 22, NULL),
            ('Kasete', 'Goitom', 22, NULL);






