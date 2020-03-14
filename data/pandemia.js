const pandemias = [
    {
        id: 1,
        nombre: "Coronavirus",
        sintomas: "Dolor de cabeza, sensación de gripa, flemas amarillas, dolor en el pecho",
        recomendaciones: [
            "Beber mucha agua",
            "Lavarse las manos constantemente",
            "Dormir bien",
            "Quedarse en casa"
        ],
        paises: [
            {
                id: 1,
                nombre: "China",
                infectados: 141000,
                recuperados: 136770,
                muertes: 2000,
                enCurso: false
                
            },
            {
                id: 2,
                nombre: "Colombia",
                infectados: 3,
                recuperados: 2,
                muertes: 0,
                enCurso: false
            }
        ]
    },
    {
        id: 2,
        nombre: "SARS",
        sintomas: "Fiebre alta, dolor de cabeza, dolor en el cuerpo",
        recomendaciones: [
            "Beber agua en abundancia",
            "Lavarse las manos",
            "Quedarse en casa",
            "Usar antibacterial"
        ],
        paises: [
            {
                id: 1,
                nombre: "Estados Unidos",
                infectados: 400,
                recuperados: 250,
                muertes: 200,
                enCurso: false
            },
            {
                id: 2,
                nombre: "Brasil",
                infectados: 2,
                recuperados: 2,
                muertes: 0,
                enCurso: false
            }
        ]
    }
];

module.exports = pandemias;