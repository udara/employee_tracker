const DB = require("./lib/db");
const Helper = require("./lib/helper");
const utils = require('util');
const colors = require('colors');
const cTable = require('console.table');
const PORT = process.env.PORT || 80;


const db_config = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Tomcat123#",
  database: "employeescms"
}

const db = new DB(db_config);
const helper = new Helper();

async function init()
{
  while (true) {

    const { main_menu_choice }  = await helper.promptMainMenu();
    
    switch (main_menu_choice) {
      case 'Add Departments':
      console.log('Add Departments');
        const {department_name} = await helper.promptAddDepartment();
        await db.insertDepartment(department_name);
        break;

      case 'Add employee roles':
        const department = await db.getDepartments();
        const json_departments_arr = [] 
        department.forEach(row => {
          json_departments_arr.push({'value':`${row.id}`, 'name': `${row.department}`});
        });
        const employee_role_data= await helper.promptAddEmployeeRoles(json_departments_arr);
        await db.insertEmployeeRole(employee_role_data);
        break;

      case 'Add employees':
        const employee_role = await db.getEmployeeRole();
        const json_employee_role_arr = [];
        const manager = await db.getManager();
        const json_manager_arr = []; 

        employee_role.forEach(row => {
          json_employee_role_arr.push({'value':`${row.id}`, 'name': `${row.title}`});
        });

        manager.forEach(row => {
          json_manager_arr.push({'value':`${row.id}`, 'name': `${row.first_name} ${row.last_name}`});
        });

        console.log(json_manager_arr);

        break;
      
      case 'View Departments':
        console.log('View Departments');  
        break;

      case 'View roles':
        console.log('View roles');  
        break;

      case 'View employees':
        const employees = await db.displayEmployee();
        break;

      case 'View employees by manager':
        console.log('Add Departments');  
        break;

      case 'Update employee roles':
        console.log('Add Departments');  
        break;

      case 'Update employee manager':
        console.log('Add Departments');  
        break;

      case 'Delete Departments':
        console.log('Add Departments');  
        break;

      case 'Delete employee roles':
        console.log('Add Departments');  
        break;

      case 'Delete employees':
        console.log('Add Departments');  
        break;
    
      default:
        console.log("Thanks, see you later!n");
        db.close();
        return;
        break;
    }
  

  } // While loop

  
}

init();