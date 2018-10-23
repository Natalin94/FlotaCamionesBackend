const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser= require('body-parser')

app.use(bodyparser.json());

var mysqlConnection= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'flotacamiones',
    multipleStatements: true
});

mysqlConnection.connect((err)=> {
    if (!err)
        console.log('DB connection succeded!');
    else
        console.log('DB connection failed \n Error:'+ JSON.stringify(err, undefined, 2))
})

app.listen(3000, ()=>console.log('Express server is running at port: 3000'));

// Traer todas las fincas
app.get('/fincas', (req, res)=>{
    mysqlConnection.query('Select * from finca',(err, rows, fields)=> {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

// Traer una sola finca
app.get('/fincas/:id', (req, res)=>{
    mysqlConnection.query('Select * from finca where NombreFinca = ?',[req.params.id],(err, rows, fields)=> {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

// Eliminar una finca
app.delete('/fincas/:id', (req, res)=>{
    mysqlConnection.query('DELETE from finca where NombreFinca = ?',[req.params.id],(err, rows, fields)=> {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    })
});

var urlencodeParser = bodyparser.urlencoded({ extended: false });
// Insertar una finca
app.post('/fincas',urlencodeParser, (req, res)=>{
    console.log(req.body.NombreFinca)
    var sql= "INSERT INTO `finca`(`NombreFinca`,`Tarifa`) VALUES ('"+req.body.NombreFinca+"','"+req.body.Tarifa+"')";
    mysqlConnection.query(sql,(err, rows, fields)=> {
        if (!err)
            res.send('Table successfully');
        else
            console.log(err);
    })
});