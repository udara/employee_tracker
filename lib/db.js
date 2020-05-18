const mysql = require('mysql');

class DB {
    constructor(db_config) {
        this.connection = mysql.createConnection( db_config );   
    }

    async connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect(err => {
                if (err) reject(err); // oh no!
                else resolve(); // oh yeah!
            })
        })
    }

    async query(command, values) {
        return new Promise((resolve, reject) => {
            this.connection.query(command, values, (error, results) => {
                if (error) reject(error); // nay!
                else resolve(results); // yay!
            })
        })
    }

    async displayEmployee()
    {
        return this.query(`SELECT employee.id as 'Id', employee.first_name as 'First Name', employee.last_name as 'Last Name', employee_role.title as 'Job Title', employee_role.salary as Salary, department.department as Department
        FROM employee
        INNER JOIN employee_role
        ON employee_role.id = employee.role_id
        INNER JOIN department
        ON employee_role.department_id = department.id`);
    }

    async displayEmployeebyManager(manager_id)
    {
        return this.query(`SELECT employee.id as 'Id', employee.first_name as 'First Name', employee.last_name as 'Last Name', employee_role.title as 'Job Title', employee_role.salary as Salary, department.department as Department
        FROM employee
        INNER JOIN employee_role
        ON employee_role.id = employee.role_id
        INNER JOIN department
        ON employee_role.department_id = department.id WHERE employee.manager_id = ${manager_id}`);
    }

    async getDepartments()
    {
        return this.query(`SELECT * from department`);
    }

    async getEmployeeRole()
    {
        return this.query(`SELECT id,title from employee_role`);
    }

    async getManager()
    {
        return this.query(`SELECT id,first_name, last_name from employee`);
    }

    async insertDepartment(department)
    {
        try {
            this.query(`INSERT INTO department (department) VALUES ('${department}');`);
            console.log(`${department} entered successfully`);
        }
        catch (error) {
            console.log(`ERROR: Inserting record to department ${error}`);
        }
    }

    async insertEmployeeRole(employee_role_data)
    {
        try {
            const { title, salary, department_id } = employee_role_data;
            this.query(`INSERT INTO employee_role (title,salary,department_id) VALUES ('${title}', '${salary}', '${department_id}');`);
            console.log(`${title} entered successfully`);
        }
        catch (error) {
            console.log(`ERROR: Inserting record to employee_role ${error}`);
        }
    }

    async insertEmployee(employee_data)
    {
        try {
            const { first_name, last_name, role_id, manager_id } = employee_data;
            this.query(`INSERT INTO employee (first_name,last_name,role_id, manager_id) VALUES ('${first_name}', '${last_name}', '${role_id}', '${manager_id}');`);
            console.log(`Employee entered successfully`);
        }
        catch (error) {
            console.log(`ERROR: Inserting record to employee ${error}`);
        }
    }

    close() {
        try{
            this.connection.end();
        }
        catch(error){
            console.log(error);
        }
    }
}

module.exports = DB;