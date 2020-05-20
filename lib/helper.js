const inquirer = require('inquirer');

class Helper {

    // all function below will return user inputs and selections as an object 

    async promptMainMenu() {
        return inquirer.prompt(
            {
            name: 'main_menu_choice',
            type: 'list',
            message: 'SELECT YOUR CHOICE',
            choices: ['Add Departments', 'Add Employee Roles' , 'Add Employees', 
            'View Departments', 'View Roles' , 'View Employees', 'View Employees by Manager', 
            'Update Employee Roles', 'Update Employee Manager', 
            'Delete Departments', 'Delete Employee Roles' , 'Delete Employees','Calc Department Salaries', 'Exit Program'],
            }
          );
    }

    async promptAddDepartment() {
        return inquirer.prompt(
            {
            name: 'department_name',
            type: 'input',
            message: 'ENTER DEPARTMENT: ',
            validate: (department) => {
                let validation =  (department.length >= 2) ? true : 'At least 2 characters required';
                return validation;
                }
            }
        );
    }

    async promptgetManager(manager) {
        return inquirer.prompt(
            {
                name: 'manager_id',
                type: 'list',
                message: 'SELECT MANAGER: ',
                choices: manager,
            },
        );
    }

    async promptAddEmployeeRoles(departments) {
        return inquirer.prompt(
            [
            {
            name: 'title',
            type: 'input',
            message: 'ENTER EMPLOYEE TITLE: ',
            validate: (title) => {
                let validation =  (title.length >= 2) ? true : 'At least 2 characters required';
                return validation;
                }
            },

            {
            name: 'salary',
            type: 'input',
            message: 'ENTER SALARY: ',
            validate: function(salary) {
                var pass = salary.match(
                    /^[0-9]+([,.][0-9]+)?$/g
                );
                if (pass) {
                  return true;
                }
          
                return 'Only Decimals or Integer';
            }
            },

            {
                name: 'department_id',
                type: 'list',
                message: 'ENTER DEPARTMENT: ',
                choices: departments,
            }
            ]
        );
    }

    async promptAddEmployee(employee_role, manager) {
        return inquirer.prompt(
            [
                {
                name: 'first_name',
                type: 'input',
                message: 'ENTER FIRST NAME: ',
                validate: (first_name) => {
                    let validation =  (first_name.length >= 2) ? true : 'At least 2 characters required';
                    return validation;
                    }
                },

                {
                    name: 'last_name',
                    type: 'input',
                    message: 'ENTER LAST NAME: ',
                    validate: (last_name) => {
                        let validation =  (last_name.length >= 2) ? true : 'At least 2 characters required';
                        return validation;
                    }
                },

                {
                    name: 'role_id',
                    type: 'list',
                    message: 'SELECT ROLE: ',
                    choices: employee_role,
                },

                {
                    name: 'manager_id',
                    type: 'list',
                    message: 'SELECT MANAGER: ',
                    choices: manager,
                }
            ]
        );
        
    }

    async promptUpdateEmployeeRole(employee,employee_role) {
        return inquirer.prompt(
            [
                {
                    name: 'employee_id_role_update',
                    type: 'list',
                    message: 'SELECT EMPLOYEE TO UPDATE: ',
                    choices: employee,
                },
                {
                    name: 'new_role_id',
                    type: 'list',
                    message: 'ALLOCATE NEW ROLE: ',
                    choices: employee_role,
                }
            ]
        );
    }

    async promptUpdateManager(employee,manager) {
        return inquirer.prompt(
            [
                {
                    name: 'employee_id',
                    type: 'list',
                    message: 'SELECT EMPLOYEE TO UPDATE: ',
                    choices: employee,
                },
                {
                    name: 'new_manager_id',
                    type: 'list',
                    message: 'ALLOCATE NEW MANAGER: ',
                    choices: manager,
                }
            ]
        );
    }

    async promptDeleteDepartment(department) {
        return inquirer.prompt(
            {
            name: 'department_id_to_delete',
            type: 'list',
            message: 'SELECT DEPARTMENT TO DELETE: ',
            choices: department,
            }
        );
    }

    async promptDeleteEmpoyeeRole(employee_role) {
        return inquirer.prompt(
            {
            name: 'employee_role_id_to_delete',
            type: 'list',
            message: 'SELECT EMPLOYEE ROLE TO DELETE: ',
            choices: employee_role,
            }
        );
    }

    async promptDeleteEmpoyee(employee) {
        return inquirer.prompt(
            {
            name: 'employee_id_to_delete',
            type: 'list',
            message: 'SELECT EMPLOYEE TO DELETE: ',
            choices: employee,
            }
        );
    }

    async promptCalculateDepartmentSum(department) {
        return inquirer.prompt(
            {
            name: 'department_id_to_calc_budget',
            type: 'list',
            message: 'SELECT DEPARTMENT TO CALCULATE SUM OF ALL SALARIES: ',
            choices: department,
            }
        );
    }



}

module.exports = Helper;