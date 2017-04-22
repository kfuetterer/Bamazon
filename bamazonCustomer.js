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
                        var newPrice = res[0].price * inputUnits;
                        var productSales = newPrice + res[0].product_sales;
                        connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: newStock, product_sales: productSales}, { item_id: inputID}], function (err, res) { })
                        connection.query("SELECT products.department_name, departments.total_sales, products.item_id FROM products INNER JOIN departments ON products.department_name=departments.department_name WHERE products.department_name = ? AND products.item_id = ?", [res[0].department_name, inputID], function (err, res) { 
                            connection.query("UPDATE products SET ? WHERE ?", [{ total_sales: res[0].total_sales}, { department_name: res[0].department_name}], function (err, res) { })
                        })
                        console.log("Total cost: " + newPrice);
                    } else {
                        console.log("Insufficient quantity!");
                    }
                });
            }

        });
});

