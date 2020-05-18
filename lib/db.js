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
        return this.query(`SELECT * from employee`)
    }

    async getDepartments()
    {
        return this.query(`SELECT * from department`)
    }

    async insertDepartment(department)
    {
        try {
        this.query(`INSERT INTO department (department) VALUES ('${department}');`);
        console.log(`${department} entered successfully`)
        }
        catch (error) {
        console.log(`ERROR: Inserting record to department ${error}`)
        }
    }

    async insertEmployeeRole(employee_role)
    {
        try {
        this.query(`INSERT INTO employee_role (id,title,salary,department_id) VALUES ('${department}');`);
        console.log(`${department} entered successfully`)
        }
        catch (error) {
        console.log(`ERROR: Inserting record to department ${error}`)
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