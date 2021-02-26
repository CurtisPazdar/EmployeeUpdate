var express = require("express");
var mysql = require("mysql");

var app = express();


var PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Cpsp1994!",
  database: "employee_db"
});

//

  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
  });

var inquirer = require('inquirer');



  const allEmployeeView = () => {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department,CONCAT(manager.first_name," ",manager.last_name) AS manager, role.salary FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;', (err, res) => {
      if (err) throw err;
      console.table(res);
    });
  };

  const showEmployeeNames = () => {
    connection.query('SELECT CONCAT(first_name," ", last_name) AS Employees FROM employee;', (err, res) => {
      if (err) throw err;
      console.table(res)
      connection.end();
    });
  };

  const showRolesWithDep = () => {
    connection.query('SELECT role.title, role.salary, department.name AS Department_Name FROM role INNER JOIN department ON role.department_id = department.id;', (err, res) => {
      if (err) throw err;
      console.table(res)
      connection.end();
    });
  };

  const showDep = () => {
    connection.query('SELECT * FROM department', (err, res) => {
      if (err) throw err;
      console.table(res)
      connection.end();
    });
  };

  const showRoles = () => {
    connection.query('SELECT title AS Roles FROM role', (err, res) => {
      if (err) throw err;
      console.table(res)
      connection.end();
    });
  };

  const newRole = () => {
    inquirer
    .prompt([
      {
        type: "input",
        message:"Please input the new role.",
        name: "title"
      },
      {
        type: "input",
        message:"Please input the new role's salary.",
        name: "salary"
      },
      {
        type: "input",
        message:"Please input the new role's department id.",
        name: "department_id"
      }
    ])
    .then(answers => {
      connection.query(`INSERT INTO role (title, salary, department_id) values ('${answers.title}','${answers.salary}','${answers.department_id}')`, (err, res) => {
        if (err) throw err;
      });
    })
    .catch(error => {
      if(error.isTtyError) {
      }
    });
  };

  const newDep = () => {
    inquirer
    .prompt([
      {
        type: "input",
        message:"Please input the new department.",
        name: "name"
      }
    ])
    .then(answers => {
      connection.query(`INSERT INTO department (name) values ('${answers.name}')`, (err, res) => {
        if (err) throw err;
      });
    })
    .catch(error => {
      if(error.isTtyError) {
      }
    });
  };

  const newEmployee = () => {
    let roleChoices = [];
    let managerChoices = [];

    for (i = 0; i < roles.length; i++) {
      roleChoices.push(Object(roles[i]))};

    for (i = 0; i < roles.length; i++) {
      managerChoices.push(Object(roles[i]))};

    inquirer
    .prompt([
      {
        type: "input",
        message:"Please input employees first name.",
        name: "first_name"
      },
      {
        type: "input",
        message:"Please input employees last name.",
        name: "last_name"
      },
      {
        type: "list",
        message:"Please select the role for this employee.",
        choices : function () {
          connection.query(`INSERT INTO department (name) values ('${answers.name}')`, (err, res) => {
            if (err) throw err;
          });
        },
        name: "name"
      },
      {
        type: "list",
        message:"Please select the manager for this employee.",
        name: "name"
      },
    ])
    .then(answers => {
      connection.query(`INSERT INTO department (name) values ('${answers.name}')`, (err, res) => {
        if (err) throw err;
      });
    })
    .catch(error => {
      if(error.isTtyError) {
      }
    });
  };

newEmployee();


app.listen(PORT);

