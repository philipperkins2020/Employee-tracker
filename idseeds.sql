INSERT INTO departments(department_name)
VALUES 
('Ownership'),
('Front Office'),
('Scouting'),
('Coaching'),
('Player Personnel');


INSERT INTO roles(title, salary, department_id)
VALUES
('Owner', 40000000, 1),
('CFO', 20000000, 2),
('General Manager', 1000000, 2),
('Head Talent Scout', 950000, 3),
('Head Coach', 2000000, 4),
('Player',9000000 , 5);

INSERT INTO employees(first_name, last_name, role_id, department_id) 
VALUES
('Mark', 'Cuban', 1, 1),
('Donnie', 'Nelson', 2 , 2),
('Philip', 'Perkins', 3,2),
('Divyesh', 'Suvagiya',4,3),
('Rick', 'Carlisle', 5,4),
('Lola', 'Suvagiya', 6,5);