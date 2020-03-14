const express = require('express');
const app = express();
let pandemias = require('./data/pandemia');

//Se declara middleware para recibir JSON
app.use(express.json());

//Se levanta servidor de express
app.listen(3000, () => {
    console.log('Corriendo en http://localhost:3000');
});

//1. Crear nueva pandemia, esta se debe crear solamente con la información básica
app.post('/crear', (req, res) => {
    //Se recibe body y se asigna a la variable pandemia
    const { body: pandemia } = req;

    //Se crea ID autoincrementable
    const id = pandemias.length + 1;
    const newPandemia = {
        id,
        ...pandemia
    }

    pandemias.push(newPandemia);

    //Se retornan todas las pandemias
    res.send(pandemias);
});

//2. Insertar y actualizar información de un país dado el id de una pandemia
app.put('/pandemia/crear-pais/:idPandemia', (req, res) => {
    //Se recibe ID de pandemia
    const { idPandemia } = req.params;

    //Se recibe body y se asigna a la variable pandemia
    const { body: pais } = req;

    const pandemia = pandemias.find((pandemia) => pandemia.id === Number(idPandemia));
    if (!pandemia) {
        res.send('ID de pandemia no existe');
    }

    //Se crea ID autoincrementable
    const idPais = pandemia.paises.length + 1;

    //Se crea nuevo objeto de país
    const newPais = {
        id: idPais,
        ...pais
    }

    //Se inserta país a la pandemia
    pandemia.paises.push(newPais);

    //Se retornan la pandemia con el nuevo país
    res.send(pandemias);

});

//3. Consultar todos los países de una pandemia con su información dado el id de la pandemia
app.get('/pandemia/consultar-pais/:idPandemia', (req, res) => {
    //Se recibe ID de pandemia
    const { idPandemia } = req.params;

    const pandemia = pandemias.find((pandemia) => pandemia.id === Number(idPandemia));
    if (!pandemia) {
        res.send('ID de pandemia no existe');
    }


    //Se retornan los paises de la pandemia
    res.send(pandemia.paises);

});

/*
    4. Consultar la información de una pandemia (ID, Nombre, Síntomas, Recomendaciones)
    incluyendo cantidad de países, cantidad de infectados, recuperados y de muertes en total de
    una pandemia, esto debe ser calculado en base a la información reportada por cada país. Y que
    retorne la información de todos los países asociados a esta pandemia con su información
*/

app.get('/pandemia/consultar/:idPandemia', (req, res) => {
    //Se recibe ID de pandemia
    const { idPandemia } = req.params;

    const pandemia = pandemias.find((pandemia) => pandemia.id === Number(idPandemia));
    if (!pandemia) {
        res.send('ID de pandemia no existe');
    }

    //Se retornan la pandemia con los paises
    res.send(pandemia);

});

/*
    Curar un país por id de pandemia y id del país, esto tendrá el efecto de que el país sumará a los
    curados la cantidad, de infectados menos la cantidad de muertos y cambiará el estado de en
    curso de verdadero a falso.
*/
app.put('/curar-pais/:idPandemia/:idPais', (req, res) => {
    //Se recibe ID de pandemia y de país
    const { idPandemia, idPais } = req.params;
    const pandemia = pandemias.find((pandemia) => pandemia.id === Number(idPandemia));
    if (!pandemia) {
        res.send('ID de pandemia no existe');
    }

    const pais = pandemia.paises.find((pais) => pais.id === Number(idPais));

    if (!pais) {
        res.send('ID de país no existe');
    }

    //A los infectados se le restan cuántos se recuperaron y cuántos murieron. Si el resultado es 0
    //Quiere decir que ya no hay infectados y se almacena en un bool
    const curado = Number(pais.infectados) - Number(pais.recuperados) - Number(pais.muertes) === 0;
    pais.enCurso = curado;

    res.send(pais);
});