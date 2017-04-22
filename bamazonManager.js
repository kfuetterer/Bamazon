var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "203980Kj",
  database: "Bamazon"
});

var choices = ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"];

inquirer.prompt([
    {
        type: "list",
        message: "Which would you like to do?",
        choices: choices,
        name: "firstChoice"
    }
]).then(function (answers) {
    
    if (answers.firstChoice === choices[0]) {
        connection.connect(function(err) { if (err) throw err;});
        connection.query("SELECT * FROM products", function (err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
            }
            console.log("-------------------------------------");
            if (err) throw err;
        });
    } else if (answers.firstChoice === choices[1]) {
        connection.connect(function(err) { if (err) throw err;});
        connection.query("SELECT * FROM products", function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    if (res[i].stock_quantity === 0 || res[i].stock_quantity === 1 || res[i].stock_quantity === 2 || res[i].stock_quantity === 3 || res[i].stock_quantity === 4) {
                        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
                    }
                }
            console.log("-------------------------------------");
            if (err) throw err;
        });
    } else if (answers.firstChoice === choices[2]) {
        inquirer.prompt([
            {
                type: "input",
                message: "Please input item id",
                name: "productID"
            },
            {
                type: "input",
                message: "Please input quantity to add",
                name: "units"
            }
        ]).then(function (answers) {
            var inputID = parseInt(answers.productID);
            var inputUnits = parseInt(answers.units);

            connection.connect(function(err) { if (err) throw err;});
            connection.query("SELECT * FROM products WHERE ?", [{item_id: inputID}], function (err, res) {
                var newStock = res[0].stock_quantity + inputUnits;
                if (err) throw err;
                connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: newStock}, { item_id: inputID}], function (err, res) { 
                    console.log("You've successfully added inventory")
                })
            });
        });

    } else {
        inquirer.prompt([
            {
                type: "input",
                message: "Please input product name",
                name: "productName"
            },
            {
                type: "input",
                message: "Please input department name",
                name: "departmentName"
            },
            {
                type: "input",
                message: "Please input quantity",
                name: "units"
            },
            {
                type: "input",
                message: "Please input price",
                name: "price"
            }
        ]).then(function (answers) {
            var addUnits = parseInt(answers.units);
            var addPrice = parseInt(answers.price);

            connection.connect(function(err) { if (err) throw err;});
            connection.query("INSERT INTO products SET ?", { product_name:answers.productName, department_name:answers.departmentName, stock_quantity: addUnits, price: addPrice}, function (err, res) { });
        });
  }

});