//cuando haces un npm install--save lo estas instalando en el proyecto y no global
const express = require("express"); 
const bodyparser = require('body-parser');
/*requeire se usa para importar archivos
se va a meter a la carpeta node_modules y va a buscar la que tenga el nombre express y retornará el index 
*/
const app = express(); //llamando al constructor de express

app.use(express.json());//se usa 'use' cuanod queremos que todas las peticiones entren al servidor usen la misma funcion
app.use(express.urlencoded({ extended: true }));




const {pokemon} = require('./pokedex.json'); //importamos nuestra base de datos 
const bodyParser = require("body-parser");
//al poner {pokemon} estamos diciendo que queremos que inporte todo tal cual esta

/*
VERBOS HTTP:
GET: Obtener recursos, es decir si entro en un login hago peticion al server y me regresa una pagina
POST: Guardar algo, almacenar cuando te registras en un sitio web quieres guardar esa información
PUT : Modificar todo un recurso
PaTCH: Modifica una parte de un recurso, supongamos se registra un usuario (nombre, apellido, edad) y solo quieres actiualizar alguno 
DELETE:Elimina un recurso

*/

app.get("/", (req, res, next) => {
    
    return res.status(200).send("bienvenido al pokedex");
});


app.post("/pokemon", (req,res,next) =>{
    return res.status(200).send(req.body);
});

/*si solo ponemos nombre es una variable estatica que no nos srive para poner muchos registros
en este caso para que sea dinamico tenemos que poner /:nombre_de_la_variable
*/
app.get("/pokemon", (req,res,next) => {
    
    return res.status(200).send(pokemon);
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
    if(id >= 0 && id <= 150) {
        return res.status(200).send(pokemon[req.params.id - 1]); //le restamos un 1 para obtener la pso real del arreglo
    }

    return res.status(404).send("No se encontro ningun elemento");
       
})

//REGEX: Admitir solo REGEX 
app.get('/pokemon/:name([A-Za-z]+)', (req, res, next) => {
    const name = req.params.name;

      /*
    pk: es una variable tipo arreglo
    p: es una variable que va a iterar en el array de pokemon 
    pokemon: es el array 
    Operador ternario (condicion) ? if true retorna : false retorna;
    */
    const pk = pokemon.filter((p) => {
        return (p.name.toUpperCase() == name.toUpperCase()) && p;
    });

   if(pk.length > 0){
     return res.status(200).send(pk);
    }
    return res.status(400).send("Pokemon no encontrado");

})

/*levantamos el servidor 
el primero es el puerto
el segundo parametro es una funcion que se ejecutará cuanod el servidor este escuchando 

 () => {} es lo mismo que:  function () {} //es una función que no tiene nombre y no podemos volver a llamar
 */
app.listen(process.env.PORT || 3000, () => {
    console.log("server is running...")
});



