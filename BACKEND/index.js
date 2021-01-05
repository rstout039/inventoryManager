const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const { isBuffer } = require('util');

const app = express();
//CREATE QUERRIES
const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM products';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Blueshoes1',
    database: 'Rotten-Inv-DB'
});

connection.connect(err=> {
    if(err) {
        return err;
    }
});

app.use(cors());
//creating first route
app.get('/', (req, res) => {
    res.send('go to /products to see products')
});

app.get('/products/add', (req, res) => {
    const { name, price } = req.query;
    const INSERT_PRODUCTS_QUERY = `INSERT INTO products (name, price) VALUES('${name}', '${price}')`;
    connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.send('successfully added product');
        }
    });
});

//creating route to products
app.get('/products', (req, res) =>{
    connection.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    })
})

app.listen(4000, () => {
    console.log(`Product server is Rotten on PORT 4000`)
});