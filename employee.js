const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require("console.table");

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: 'Dakzeke88!',
    database: 'employeeDB',
});

connection.connect((err) => {
    if (err) throw err;
    employeeInfo();
});
const employeeInfo = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'Add Departments',
                'Add Roles',
                'Add Employees',
                'View Departments',
                'View Roles',
                'View Employees',
                'Update Employee Roles',
                'Exit'
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'Add Departments':
                    addDepart();
                    break;

                case 'Add Roles':
                    addRole();
                    break;

                case 'Add Employees':
                    addEmployee();
                    break;

                case 'View Departments':
                    viewDepart();
                    break;

                case 'View Roles':
                    viewRoles();
                    break;

                case 'View Employees':
                    viewEmployee();
                    break;

                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;

                case 'Exit':
                    connection.end();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};
const addDepart = () => {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What Department would you like to add?"
        }
    ]).then(function (res) {
        var query = connection.query(
            "INSERT INTO department (name) VALUES(?) ",

            [res.name],

            function (err) {
                if (err) throw err
                console.table(res);
                employeeInfo();
            }
        )
    })
}
const addRole = () => {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What Role would you like to add?"
        },
        {
            name: "salary",
            type: "input",
            message: "What Salary will this role have?"
        },
        {
            name: "department_id",
            type: "input",
            message: "What department will this role be in?"
        }

    ]).then(function (res) {

        var query = connection.query(
            "INSERT INTO role  (title,salary,department_id) VALUES(?,?,?) ",
            [res.title, res.salary, res.department_id],

            function (err) {
                if (err) throw err
                console.table(res);
                employeeInfo();
            }
        )
    })
}
const addEmployee = () => {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the first name of the employee?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the last name of the employee?"
        },
        {
            name: "role_id",
            type: "input",
            message: "What is the role ID of the employee?"
        },
        {
            name: "manager_id",
            type: "input",
            message: "What is the department ID of the employee?"
        }

    ]).then(function (res) {

        const query = connection.query(
            "INSERT INTO employee  (first_name,last_name,role_id,manager_id) VALUES(?,?,?,?) ",
            [res.first_name, res.last_name, res.role_id, res.manager_id],

            function (err) {
                if (err) throw err
                console.table(res);
                employeeInfo();
            }
        )
    })
}

const viewDepart= () => {
    connection.query(
    function(err, res) {
      if (err) throw err
      console.table(res)
      employeeInfo()
    })
}
const viewRoles= () => {
    connection.query(
    function(err, res) {
      if (err) throw err
      console.table(res)
      employeeInfo()
    })
}
const viewEmployee= () => {
    connection.query( 
    function(err, res) {
      if (err) throw err
      console.table(res)
      employeeInfo()
    })
}
