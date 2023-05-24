const express = require("express"); //si coloco en package.json: type:"module" puedo importar como react: import express from "express";

const app = express();

app.get("/bienvenida", (req, res)=>{ //request y response
    res.send(`<h1 style="color: blue">"Hola mundo desde express"</h1>`);
});

app.get("/usuario", (req, res)=>{ //request y response
    res.send({nombre:"Jose", apellido:"Peralta", edad:"40", correo:"jp@gmail.com"});
});

app.get("/unparam/:nombre/:apellido", (req, res)=>{ //de esta forma se imprime el url "nombre"q

    console.log(req.params.nombre)

    res.send(`Hola ${req.params.nombre} ${req.params.apellido}`)

    res.send("Hola Mundo desde express");
});

app.get("/prueba_queries", (req, res)=>{
    console.log(req.query);
    res.send(req.query); 
})

app.listen(8080, ()=>{ //esto es para que el servidor siga corriendo en el puerto elegido
    console.log("servidor en el puerto 8080")
})