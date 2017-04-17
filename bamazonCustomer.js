var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "203980Kj",
  database: "Bamazon"
});

inquirer.prompt([
    {
    type: "confirm",
    message: "View our store",
    name: "view"
    }
]).then(function (answers) {

    if (answers.view) {
        connection.connect(function(err) { if (err) throw err;});
        connection.query("SELECT * FROM products", function (err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
            }
            console.log("-------------------------------------");
            if (err) throw err;
        });
    }
    inquirer.prompt([
            {
                type: "input",
                message: "Please input product id",
                name: "productID"
            },
            {
                type: "input",
                message: "Please input how many units",
                name: "units"
            },
            {
                type: "confirm",
                message: "Place Order",
                name: "confirm"
            }
        ]).then(function (answers) {
            var inputID = parseInt(answers.productID);
            var inputUnits = parseInt(answers.units);

            if (answers.confirm) {
                connection.connect(function(err) { if (err) throw err;});
                connection.query("SELECT * FROM products WHERE ?", [{item_id: inputID}], function (err, res) {
                    if (err) throw err;

                    if (res[0].stock_quantity >= inputUnits) {
                        var newStock = res[0].stock_quantity - inputUnits;
                        connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: newStock}, { item_id: inputID}], function (err, res) { })
                        console.log("Total cost: " + res[0].price * inputUnits);
                    } else {
                        console.log("Insufficient quantity!");
                    }
                });
            }

        });
});

