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

    async displayDepartments()
    {
        return this.query(`SELECT * from department`);
    }

    async displayEmployeeRole()
    {
        return this.query(`SELECT id,title from employee_role`);
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
        const department = await this.query(`SELECT * from department`);
        const json_departments_arr = [];
        department.forEach(row => {
          json_departments_arr.push({'value':`${row.id}`, 'name': `${row.department}`});
        });
        return json_departments_arr;
    }

    async getEmployeeRole()
    {
        const employee_role = await this.query(`SELECT id,title from employee_role`);
        const json_employee_role_arr = [];
        employee_role.forEach(row => {
            json_employee_role_arr.push({'value':`${row.id}`, 'name': `${row.title}`});
          });
        return json_employee_role_arr;
    }

    async getManager()
    {
        const manager = await this.query(`SELECT * FROM employee where id IN 
        (SELECT DISTINCT manager_id FROM employee where manager_id !="" group by manager_id);`);

        const json_manager_arr = [{'value': null, name:'No Manager'}]; 

        manager.forEach(row => {
          json_manager_arr.push({'value':`${row.id}`, 'name': `${row.first_name} ${row.last_name}`});
        });
        return json_manager_arr;
    }

    async getEmployee()
    {
        const employee_list = await this.query(`SELECT * FROM employee`);
        const json_employee_list_arr = [];
        employee_list.forEach(row => {
          json_employee_list_arr.push({'value':`${row.id}`, 'name': `${row.first_name} ${row.last_name}`});
        });
        return json_employee_list_arr;
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

    async updateEmployeeRole(employee_id, new_employee_role)
    {
        try {
            this.query(`UPDATE employee SET role_id = ${new_employee_role} WHERE (id = ${employee_id})`);
            console.log(`Employee role updated successfully`);
        }
        catch (error) {
            console.log(`ERROR: Updating employee role ${error}`);
        }
    }

    async updateEmployeeManager(employee_id, new_manager_id)
    {
        try {
            this.query(`UPDATE employee SET manager_id = ${new_manager_id} WHERE (id = ${employee_id})`);
            console.log(`Employee manager updated successfully`);
        }
        catch (error) {
            console.log(`ERROR: Updating employee manager ${error}`);
        }
    }

    async deleteDepartments(department_id)
    {
        try
        {
            this.query(`DELETE FROM department WHERE (id = ${department_id})`);
            this.query(`UPDATE employee_role SET department_id = 0 WHERE (department_id = ${department_id})`);
            console.log(`Successfully deleted this department.`);
            console.log(`All recosrd with this department id from employee_role set to 0`);
        }
        catch (error) {
            console.log(`ERROR: Deleteing this department ${error}`);
        }
    }

    async deleteEmployeeRole(employee_role_id)
    {
        try
        {
            this.query(`DELETE FROM employee_role WHERE (id = ${employee_role_id})`);
            this.query(`UPDATE employee SET role_id = 0 WHERE (role_id = ${employee_role_id})`);
            console.log(`Successfully deleted this employee role.`);
            console.log(`All recosrd with this employee role id from employee set to 0`);
        }
        catch (error) {
            console.log(`ERROR: Deleteing this department ${error}`);
        }
    }


    async deleteEmployee(employee_id)
    {
        try
        {
            this.query(`DELETE FROM employee WHERE (id = ${employee_id})`);
            console.log(`Successfully deleted this employee.`);
        }
        catch (error) {
            console.log(`ERROR: Deleteing this employee ${error}`);
        }
    }

    async budgetForSelectedDepartment(department_id)
    {
        return this.query(`SELECT sum(employee_role.salary) as 'Total Salary'  FROM employee
        INNER JOIN employee_role
        ON employee_role.id = employee.role_id
        INNER JOIN department
        ON employee_role.department_id = department.id WHERE department.id = ${department_id}`);
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