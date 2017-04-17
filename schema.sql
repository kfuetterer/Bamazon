CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
item_id INT(11) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(255),
department_name VARCHAR(255),
price DEC(10,2),
stock_quantity INT(11),
PRIMARY KEY(item_id)
);

INSERT INTO products (item_id, product_name, department_name, stock_quantity, price)
VALUES (110, "Kindle Paperwhite", "Kindle Store", 20, 78.00);

INSERT INTO products (item_id, product_name, department_name, stock_quantity, price)
VALUES (111, "Lace High Neck Dress", "Women's Clothing", 40, 38.00);

INSERT INTO products (item_id, product_name, department_name, stock_quantity, price)
VALUES (112, "HP TouchScreen Laptop Computer", "Electronics", 12, 249.99);

INSERT INTO products (item_id, product_name, department_name, stock_quantity, price)
VALUES (113, "Bluetooth Headphones", "Electronics", 100, 19.99);

INSERT INTO products (item_id, product_name, department_name, stock_quantity, price)
VALUES (114, "Unique Colors Gel Pen", "Arts and Crafts", 2, 15.99);

INSERT INTO products (item_id, product_name, department_name, stock_quantity, price)
VALUES (115, "Solar Powered String Lights", "Home Improvement", 5, 10.00);

INSERT INTO products (item_id, product_name, department_name, stock_quantity, price)
VALUES (116, "Wi-Fi Universal Dimmer", "Home Improvement", 3, 30.00);

INSERT INTO products (item_id, product_name, department_name, stock_quantity, price)
VALUES (117, "Nikon Coolpix Digital Camera", "Electronics", 99, 156.00);

INSERT INTO products (item_id, product_name, department_name, stock_quantity, price)
VALUES (118, "Fire TV Stick", "Electronics", 35, 39.99);

INSERT INTO products (item_id, product_name, department_name, stock_quantity, price)
VALUES (119, "Little Girls' Flower Dress", "Girl's Clothing", 68, 12.99);

SELECT * FROM products;
