//cuando haces un npm install--save lo estas instalando en el proyecto y no global

const express = require("express"); 
/*requeire se usa para importar archivos
se va a meter a la carpeta node_modules y va a buscar la que tenga el nombre express y retornará el index 
*/


const app = express(); //llamando al constructor de express

const pokedex = require('./pokedex.json'); //importamos nuestra base de datos 

/*
VERBOS HTTP:
GET: Obtener, es decir si entro en un login hago peticion al server y me regresa una pagina
POST: Guardar algo, cuando te registras en un sitio web quieres guardar esa información
PATCH: Actualizacion de datos, supongamos se registra un usuario (nombre, apellido, edad) y solo quieres actiualizar alguno
PUT: Actualizacion de datos, modifica todos los elementos a diferencia de PATCH
DELETE:Elimina un recurso

*/

app.get("/", (req, res, next) => {
    const pokemon = pokedex.pokemon;
    res.status(200);
    res.send(pokemon);
});

/*si solo ponemos nombre es una variable estatica que no nos srive para poner muchos registros
en este caso para que sea dinamico tenemos que poner /:nombre_de_la_variable
*/
app.get("/:name", (req,res,next) => {
    console.log(req.params.name);
    res.status(200);
    res.send("Hola,"+ req.params.name);
})

/*como todos los navegadores ejecutan peticiones get apartir de una diagonal por eso ponemos 
 www.facebook/HugoLazzarini
 por eos ponemos esa para que lo ejecute sin errores 

 el segundo parametro: 

 REQ: La peticion que nos esta haciendo el cliente 
 RES: La respuesta que vamos a dar, comtestar la peticion que pedimos
 NEXT:
*/

/*levantamos el servidor 
el primero es el puerto
el segundo parametro es una funcion que se ejecutará cuanod el servidor este escuchando 

 () => {} es lo mismo que:  function () {} //es una función que no tiene nombre y no podemos volver a llamar
 */
app.listen(process.env.PORT || 3000, () => {
    console.log("server is running...")
});


