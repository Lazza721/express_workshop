const express = require('express');
const pokemon = express.Router(); //nos ayuda a segmentar nuestro codigo y que por default sea esa la ruta sin necesidad de especificar

const pk = require('../pokedex.json').pokemon; //importamos nuestra base de datos .. salir carpeta



pokemon.post("/", (req,res,next) =>{
    return res.status(200).send(req.body);
});

/*si solo ponemos nombre es una variable estatica que no nos srive para poner muchos registros
en este caso para que sea dinamico tenemos que poner /:nombre_de_la_variable
*/
pokemon.get("/", (req,res,next) => {
    
    return res.status(200).send(pk);
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
pokemon.get('/:id([0-9]{1,3})', (req, res, next) => {
    const id = req.params.id -1;
    if(id >= 0 && id <= 150) {
        return res.status(200).send(pk[req.params.id - 1]); //le restamos un 1 para obtener la pso real del arreglo
    }

    return res.status(404).send("No se encontro ningun elemento");
       
})

//REGEX: Admitir solo REGEX 
pokemon.get('/:name([A-Za-z]+)', (req, res, next) => {
    const name = req.params.name;

      /*
    pk: es una variable tipo arreglo
    p: es una variable que va a iterar en el array de pokemon 
    pokemon: es el array 
    Operador ternario (condicion) ? if true retorna : false retorna;
    */
    const pkmon = pk.filter((p) => {
        return (p.name.toUpperCase() == name.toUpperCase()) && p;
    });

   if(pkmon.length > 0){
     return res.status(200).send(pkmon);
    }
    return res.status(400).send("Pokemon no encontrado");

})

/*levantamos el servidor 
el primero es el puerto
el segundo parametro es una funcion que se ejecutará cuanod el servidor este escuchando 

 () => {} es lo mismo que:  function () {} //es una función que no tiene nombre y no podemos volver a llamar
 */

 module.exports = pokemon;