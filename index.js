const express = require("express"); 
/*requeire se usa para importar archivos
se va a meter a la carpeta node_modules y va a buscar la que tenga el nombre express y retornará el index 
*/


const app = express(); //llamando al constructor de express

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
    res.send("Hola Mundo :D");
});

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
app.listen(3000, () => {
    console.log("server is running...")
});


