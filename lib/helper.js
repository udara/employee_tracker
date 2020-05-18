const inquirer = require('inquirer');

class Helper {

    async promptMainMenu() {
        return inquirer.prompt(
            {
            name: 'main_menu_choice',
            type: 'list',
            message: 'SELECT YOUR CHOICE',
            choices: ['Add Departments', 'Add employee roles' , 'Add employees', 
            'View Departments', 'View roles' , 'View employees', 'View employees by manager', 
            'Update employee roles', 'Update employee manager', 
            'Delete Departments', 'Delete employee roles' , 'Delete employees', 'Exit Program'],
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
            message: 'ENTER SALARY: '
            },

            {
                name: 'department_id',
                type: 'list',
                message: 'ENTER DEPARTMENT: ',
                choices: departments,
                validate: (department_id) => {
                    return validation;
                    }
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



}

module.exports = Helper;