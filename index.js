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



  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }

    console.log("connected as id " + connection.threadId);
  });




  const allEmployeeView = () => {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department,CONCAT(manager.first_name," ",manager.last_name) AS manager, role.salary FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;', (err, res) => {
      if (err) throw err;
      console.table(res)
      connection.end();
    });
  };








allEmployeeView();



app.listen(PORT);
console.log('Server running at http://localhost:' + PORT + '/');
// // Use Handlebars to render the main index.html page with the plans in it.
// app.get("/", function(req, res) {
//   connection.query("SELECT * FROM plans;", function(err, data) {
//     if (err) {
//       return res.status(500).end();
//     }

//     res.render("index", { plans: data });
//   });
// });




// app.use(express.static(path.join(__dirname, '/')));


// // Create a new plan
// app.post("/api/plans", function(req, res) {
//   connection.query("INSERT INTO plans (plan) VALUES (?)", [req.body.plan], function(err, result) {
//     if (err) {
//       return res.status(500).end();
//     }

//     // Send back the ID of the new plan
//     res.json({ id: result.insertId });
//     console.log({ id: result.insertId });
//   });
// });

// // Update a plan
// app.put("/api/plans/:id", function(req, res) {
//   connection.query("UPDATE plans SET plan = ? WHERE id = ?", [req.body.plan, req.params.id], function(err, result) {
//     if (err) {
//       // If an error occurred, send a generic server failure
//       return res.status(500).end();
//     }
//     else if (result.changedRows === 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     }
//     res.status(200).end();

//   });
// });

// // Delete a plan
// app.delete("/api/plans/:id", function(req, res) {
//   connection.query("DELETE FROM plans WHERE id = ?", [req.params.id], function(err, result) {
//     if (err) {
//       // If an error occurred, send a generic server failure
//       return res.status(500).end();
//     }
//     else if (result.affectedRows === 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     }
//     res.status(200).end();

//   });
// });

// // Start our server so that it can begin listening to client requests.
// app.listen(PORT, function() {
//   // Log (server-side) when our server has started
//   console.log("Server listening on: http://localhost:" + PORT);
// });
