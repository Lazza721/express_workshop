const express = require('express');
const pokemon = express.Router(); //nos ayuda a segmentar nuestro codigo y que por default sea esa la ruta sin necesidad de especificar

const db = require('../config/database.js'); //importamos nuestra base de datos .. salir carpeta



pokemon.post("/", async (req,res,next) =>{

    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;

    if(pok_name && pok_height && pok_weight && pok_base_experience){
        let query = "INSERT INTO pokemon(pok_name, pok_height, pok_weight, pok_base_experience)";

        query += `vALUES('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;
    
        const rows = await db.query(query); 
        
        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "pokemon insertado"});
        }
        //En post el 201 es como un 200 en get y dice que el recurso se creo
        return res.status(500).json({code: 500, message: "Ocurrió un error"});

    }

    res.status(500).json({code: 500, message: "los campos no han sido mandados"});


    
});

/*si solo ponemos nombre es una variable estatica que no nos srive para poner muchos registros
en este caso para que sea dinamico tenemos que poner /:nombre_de_la_variable
*/
pokemon.get("/", async (req,res,next) => {

    const pkmon = await db.query("SELECT * FROM pokemon");    
    return res.status(200).json({code:200, message: pkmon});
})

//console.log(req.params.name);
// res.send("Hola,"+ req.params.name);
/*como todos los navegadores ejecutan peticiones get apartir de una diagonal por eso ponemos 
 www.facebook/HugoLazzarini
 por eos ponemos esa para que lo ejecute sin errores 

 el segundo parametro: 

 REQ: La peticion que nos esta haciendo el cliente 
 RES: La respuesta que vamos a dar, comtestar la peticion que pedimos
 NEXT:
*/
//Ponemos ([0-9]{1,3}) para dcir que llama a una funcion para admitir solo numeros
pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    if(id >= 1 && id <= 722) {
        const pkmon = await db.query("SELECT * FROM pokemon WHERE pok_id = "+id+";");  
        return res.status(200).json({code: 200, message: pkmon}); //le restamos un 1 para obtener la pso real del arreglo
    }
    return res.status(404).json({code: 404, message: "Pokemon no esta en el rango"});
       
})

//REGEX: Admitir solo REGEX 
pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;
    const pkmon = await db.query("SELECT * FROM pokemon WHERE pok_name = '"+name+"';");

      /*
    pk: es una variable tipo arreglo
    p: es una variable que va a iterar en el array de pokemon 
    pokemon: es el array 
    Operador ternario (condicion) ? if true retorna : false retorna;
    */

   if(pkmon.length > 0){
    return res.status(200).json({code: 200, message: pkmon}); 
    }
    return res.status(404).send({code: 404, message:"pokemon no encontrado"});

})

/*levantamos el servidor 
el primero es el puerto
el segundo parametro es una funcion que se ejecutará cuanod el servidor este escuchando 

 () => {} es lo mismo que:  function () {} //es una función que no tiene nombre y no podemos volver a llamar
 */

 module.exports = pokemon;


