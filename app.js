const express = require('express');
const app = express();
const pandemias = require('./data/pandemia');


//Se levanta servidor de express
app.listen(3000, () => {
    console.log('Corriendo en http://localhost:3000');
});

//1. Crear nueva pandemia, esta se debe crear solamente con la información básica
app.post('/crear', (req, res) => {
    console.log(req.body);
    const pandemia = req.body;
    res.send('Todo bien');
});