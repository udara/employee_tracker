USE employeescms;
/*

SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_role.salary, department.department
FROM employee
INNER JOIN employee_role
ON employee_role.id = employee.role_id
INNER JOIN department
ON employee_role.department_id = department.id


DROP DATABASE IF EXISTS employeesCMS;
CREATE database employeesCMS
USE employeesCMS

CREATE TABLE departmendepartmentt (
    id INT NOT NULL AUTO_INCREMENT,
    department VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee_role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary decimal NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);*/
