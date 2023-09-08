//cuando haces un npm install--save lo estas instalando en el proyecto y no global

const express = require("express"); 
/*requeire se usa para importar archivos
se va a meter a la carpeta node_modules y va a buscar la que tenga el nombre express y retornará el index 
*/


const app = express(); //llamando al constructor de express

const {pokemon} = require('./pokedex.json'); //importamos nuestra base de datos 
//al poner {pokemon} estamos diciendo que queremos que inporte todo tal cual esta

/*
VERBOS HTTP:
GET: Obtener, es decir si entro en un login hago peticion al server y me regresa una pagina
POST: Guardar algo, cuando te registras en un sitio web quieres guardar esa información
PATCH: Actualizacion de datos, supongamos se registra un usuario (nombre, apellido, edad) y solo quieres actiualizar alguno
PUT: Actualizacion de datos, modifica todos los elementos a diferencia de PATCH
DELETE:Elimina un recurso

*/

app.get("/", (req, res, next) => {
    res.status(200);
    res.send("bienvenido al pokedex");
});

/*si solo ponemos nombre es una variable estatica que no nos srive para poner muchos registros
en este caso para que sea dinamico tenemos que poner /:nombre_de_la_variable
*/
app.get("/:pokemon/all", (req,res,next) => {
    res.status(200);
    res.send(pokemon);
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
app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) => {
    const id = req.params.id -1;
    if(id >= 0 && id <= 151){
        res.status(200);
        res.send(pokemon[req.params.id - 1]); //le restamos un 1 para obtener la pso real del arreglo
    }else{
        res.status(404);
        res.send("No se encontro ningun elemento")
    }    
})

app.get('/pokemon/:name', (req, res, next) => {
    const name = req.params.name;
    for(i =0; i< pokemon.length;i++){
        if(pokemon[i].name == name){
            res.status(200);
            res.send(pokemon[i]);
        }
    }
    res.status(404); //funciona como un return, cuando no encuentra algo en el for se va a lo siguiente
    res.send("Pokemon no encontrado"); 

})

/*levantamos el servidor 
el primero es el puerto
el segundo parametro es una funcion que se ejecutará cuanod el servidor este escuchando 

 () => {} es lo mismo que:  function () {} //es una función que no tiene nombre y no podemos volver a llamar
 */
app.listen(process.env.PORT || 3000, () => {
    console.log("server is running...")
});



