var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "203980Kj",
  database: "Bamazon"
});

var choices = ["View Product Sales By Department", "Create New Department"];

inquirer.prompt([
    {
        type: "list",
        message: "Which would you like to do?",
        choices: choices,
        name: "firstChoice"
    }
]).then(function (answers) {
    if (answers.firstChoice === choices[0]) {
        inquirer.prompt([
            {
                type: "input",
                message: "Please input department name",
                name: "departmentInput"
            }
        ]).then(function (answers) {
            var chosenDepartment = answers.departmentInput;
            connection.connect(function(err) { if (err) throw err;});
            connection.query("SELECT departments.department_id, departments.department_name, departments.over_head_costs, departments.total_sales, sum(products.product_sales) AS product_sales FROM departments RIGHT JOIN products ON products.department_name = departments.department_name WHERE departments.department_name = ?", [chosenDepartment], function(err, res){
                console.log(res[0].department_id + " | " + res[0].department_name + " | " + res[0].over_head_costs + " | " + res[0].total_sales + " | " + res[0].product_sales);
            });
        })
    } else {
        inquirer.prompt([
            {
                type: "input",
                message: "Please input department name",
                name: "departmentName"
            },
            {
                type: "input",
                message: "Please input over head costs",
                name: "overHeadCosts"
            }
        ]).then(function (answers) {
            connection.connect(function(err) { if (err) throw err;});
            connection.query("INSERT INTO departments SET ?", { department_name:answers.departmentName, over_head_costs:answers.overHeadCosts}, function (err, res) { });
        });
    }
});