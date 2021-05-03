const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require("console.table");
const { async } = require('rxjs');

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    
    user: 'root',

   
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
            "INSERT INTO departments (department_name) VALUES(?) ",

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
            type: "list",
            message: "What department will this role be in?",
            choices: ["1-Ownership", "2-Front Office", "3-Scouting", "4-Coaching", "5-Player Personnel", "6-Sales", "7-Medical", "8-Customer Service"]
        }

    ]).then(function (res) {

        connection.query(
            "INSERT INTO roles  (title,salary,department_id) VALUES(?,?,?) ",
            [res.title, res.salary, res.department_id.split('-')[0]],

            function (err) {
                if (err) throw err
                console.table(res);
                employeeInfo();
            }
        )
    })
}
const addEmployee = async () => {
    const departmentList = []
     await connection.query("SELECT * from departments",function(err,data) {
        console.log(data) 
         data.forEach(row => departmentList.push(row))
    }
    )

    connection.query(`SELECT * from roles` , (err, roleList) => {
        if (
            err) {
            console.log(err)
        }
        console.log(roleList)


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
                type: "list",
                message: "What is the role of your new employee?",

                choices: roleList.map(role=>({value:role.id,name:role.title}))
            },

            {
                name: "department_id",
                type: "list",
                message: "What is the department ID of the employee?",
                choices: departmentList.map(dept => ({value:dept.id,name:dept.department_name}))
            }

        ]).then(function (res) {

            connection.query(
                "INSERT INTO employee  (first_name,last_name,role_id,department_id) VALUES(?,?,?,?) ",
                [res.first_name, res.last_name, res.role_id, res.department_id],

                function (err) {
                    if (err) throw err
                    console.table(res);
                    employeeInfo();
                }
            )
        })
    })
}


const viewDepart = () => {
    connection.query(`SELECT * from departments`,
        function (err, res) {
            if (err) throw err
            console.table(res)
            employeeInfo()
        })
}
const viewRoles = () => {
    connection.query(`SELECT * from roles`,
        function (err, res) {
            if (err) throw err
            console.table(res)
            employeeInfo()
        })
}
const viewEmployee = () => {
    connection.query(`SELECT employee.first_name, employee.last_name, departments.department_name, roles.title, roles.salary
        FROM employee
        INNER JOIN departments ON employee.department_id = departments.id
        INNER JOIN roles ON employee.role_id = roles.id`,
        function (err, res) {
            if (err) throw err
            console.table(res)
            employeeInfo()
        })
}

const updateEmployeeRole = () => {
    connection.query( `SELECT * from employee`,
        function (err, res) {
            if (err) throw err
            console.table(res)
            
        });

}
