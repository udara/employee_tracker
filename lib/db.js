const mysql = require('mysql');
const colors = require('colors');

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
        return this.query(`SELECT * from employee`)
    }

    async getDepartments()
    {
        return this.query(`SELECT * from department`)
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
            console.log(`${department} entered successfully`)
        }
        catch (error) {
            this.dbError('ERROR: Inserting record to department', error);
        }
    }

    async insertEmployeeRole(employee_role_data)
    {
        try {
            const { title, salary, department_id } = employee_role_data;
            this.query(`INSERT INTO employee_role (title,salary,department_id) VALUES ('${title}', '${salary}', '${department_id}');`);
            this.dbSuccess('Employee role entered successfully');
        }
        catch (error) {
            this.dbError('ERROR: Inserting record to employee_role', error);
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

    dbError(message,error)
    {
        console.log(colors.gBrightRed(`${message} - ${error}`));
    }

    dbSuccess(message)
    {
        console.log(colors.gBrightRed(`${message} - ${error}`));
    }

}

module.exports = DB;