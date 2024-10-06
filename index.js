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

app.post("/update", (req, res)=>{
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const email = req.body.email;
    const id = req.body.id;

    db.query('UPDATE registros SET nombre=?, apellido=?, email=? WHERE id=?', [nombre, apellido,email, id], (err, result)=>{
        if(err){
            console.log(err);
        } else {
            res.send("Registro editado");
        }
    });
});

app.put("/delete/:id", (req, res)=>{
    
    const id = req.params.id;

    db.query('DELETE FROM registros WHERE id=?', [id], (err, result)=>{
        if(err){
            console.log(err);
        } else {
            res.send("Borrado editado");
            console.log(id);
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