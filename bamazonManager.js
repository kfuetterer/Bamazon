var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "203980Kj",
  database: "Bamazon"
});

var choices = ["Display all songs", "Search by artist", "Show artists more than twice in database", "Search by Range", "Artists with song and album in the top", "Search by song",];

inquirer.prompt([
    {
        type: "list",
        message: "Which would you like to do?",
        choices: choices,
        name: "firstChoice"
    }
]).then(function (answers) {