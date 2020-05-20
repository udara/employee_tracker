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
  while (true) { // Loop till user picks option that is not in the menu. (i.e Exit Program)

    const { main_menu_choice }  = await helper.promptMainMenu();
    
    switch (main_menu_choice) {
      case 'Add Departments':
        console.clear();
        console.log( colors.bgBlue('Add Departments') );
        const {department_name} = await helper.promptAddDepartment();
        await db.insertDepartment( department_name ); 
        break;

      case 'Add Employee Roles':
        console.clear();
        console.log(colors.bgBlue('Add Employee Roles'));
        const employee_role_data= await helper.promptAddEmployeeRoles( await db.getDepartments() );
        await db.insertEmployeeRole(employee_role_data);
        break;

      case 'Add Employees':
        console.clear();
        console.log( colors.bgBlue('Add Employees') );
        const employee_data= await helper.promptAddEmployee( await db.getEmployeeRole() , await db.getManager());
        await db.insertEmployee( employee_data );
        break;
      
      case 'View Departments':
        console.clear();
        console.log(colors.bgBlue('View Departments'));
        console.table( await db.displayDepartments() );
        break;

      case 'View Roles':
        console.clear();
        console.log( colors.bgBlue('View Roles') );
        console.table( await db.displayEmployeeRole() );   
        break;

      case 'View Employees':
        console.clear();
        console.log( colors.bgBlue('View Employees') );
        console.table( await db.displayEmployee() );
        break;

      case 'View Employees by Manager':
        console.clear();
        console.log( colors.bgBlue('View Employees by Manager') );
        const {manager_id} = await helper.promptgetManager( await db.getManager() );
        console.table( await db.displayEmployeebyManager( manager_id ) );
        break;

      case 'Update Employee Roles':
        console.clear();
        console.log(colors.bgBlue('Update Employee Roles'));
        const { employee_id_role_update, new_role_id } = await helper.promptUpdateEmployeeRole( await db.getEmployee() , await db.getEmployeeRole() )
        db.updateEmployeeRole( employee_id_role_update , new_role_id );
      break;

      case 'Update Employee Manager':
        console.clear();
        console.log(colors.bgBlue('Update Employee Manager'));
        const { employee_id, new_manager_id } = await helper.promptUpdateManager( await db.getEmployee(), await db.getManager()  );
        db.updateEmployeeManager( employee_id, new_manager_id );
        break;

      case 'Delete Departments':
        console.clear();
        console.log(colors.bgBlue('Delete Departments'));
        const { department_id_to_delete } =  await helper.promptDeleteDepartment( await db.getDepartments() )
        db.deleteDepartments( department_id_to_delete );
        break;

      case 'Delete Employee Roles':
        console.clear();
        console.log(colors.bgBlue('Delete Employee Roles'));
        const { employee_role_id_to_delete } =  await helper.promptDeleteEmpoyeeRole( await db.getEmployeeRole() );
        db.deleteEmployeeRole( employee_role_id_to_delete );  
        break;

      case 'Delete Employees':
        console.clear();
        console.log(colors.bgBlue('Delete Employee'));  
        const { employee_id_to_delete } =  await helper.promptDeleteEmpoyee( await db.getEmployee() );
        db.deleteEmployee( employee_id_to_delete );
        break;

        case 'Calc Department Salaries':
          console.clear();
          console.log(colors.bgBlue('Calc Department Salaries'));
          const { department_id_to_calc_budget } =  await helper.promptCalculateDepartmentSum( await db.getDepartments() );
          console.table( await db.budgetForSelectedDepartment( department_id_to_calc_budget )); 
          break;
    
      default:
        console.clear();
        console.log("Thanks, see you later!n");
        db.close();
        return;
        break;
    }
  

  } // While loop

  
}
console.clear();
init();