//cuando haces un npm install--save lo estas instalando en el proyecto y no global
const express = require('express'); 
/*requeire se usa para importar archivos
se va a meter a la carpeta node_modules y va a buscar la que tenga el nombre express y retornará el index 
*/
const app = express(); //llamando al constructor de express
const pokemon = require('./routes/pokemon.js');
const morgan = require('morgan');


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));  //dev: solo funciona en el desarrollo




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
    
    return res.status(200).json({code:1, message: "Bienvenido al Pokedex"});
});

app.use('/pokemon',pokemon);

app.use((req,res,next) =>{
    return res.status(404).json({code: 404, message: "URL NO ENCONTRADA"});
});

app.listen(process.env.PORT || 3000, () => {
    console.log("server is running...")
});



