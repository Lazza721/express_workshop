//cuando haces un npm install--save lo estas instalando en el proyecto y no global
const express = require('express'); 
const app = express(); //llamando al constructor de express
const pokemon = require('./routes/pokemon.js');
const user = require('./routes/user.js');
const auth = require('./middleware/auth.js');
const notFound = require('./middleware/notFound.js');
const morgan = require('morgan');
const cors = require('./middleware/cors.js')

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));  //dev: solo funciona en el desarrollo

app.get("/", (req, res, next) => {
    
    return res.status(200).json({code:1, message: "Bienvenido al Pokedex"});
});

app.use('/user',user);
//middleware que se aplicara a todas las rutas
app.use(auth); 
app.use('/pokemon',pokemon);


app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
    console.log("server is running...")
});



