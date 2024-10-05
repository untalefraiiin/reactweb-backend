const express = require('express');
const app = express();
const mysql = require("mysql");

const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"react"
});

app.post("/create", (req, res)=>{
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const email = req.body.email;

    db.query('INSERT INTO registros(nombre, apellido, email) VALUES (?,?,?)', [nombre, apellido,email], (err, result)=>{
        if(err){
            console.log(err);
        } else {
            res.send("Registro enviado");
        }
    });
});

app.get("/registros", (req, res)=>{
    db.query('SELECT * FROM registros', 
    (err, result)=>{
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(3001, ()=>{
    console.log("Corriendo exitosamente");
})