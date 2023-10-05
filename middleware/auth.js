const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    try{

        const token = req.headers.authorization.split(" ")[1];
        //El usuario mandara el token por req y desde el encabezado de la peticion
        //Headers por que de ahi tomamos los datos
        //Authorization va en el header
        //split() nos genera un array de dos posiciones y tomamos la 2 que es el token
        const decoded = jwt.verify(token, "debugkey");
        //Va a verificar y decodificar el token, verifica la llave con debugkey
        //si la pudo decodificar y es valida la guardará en decoded
        req.user = decoded;

        console.log(decoded);
        //Guardamos el resultaod en user para cad peticion que haga
        next();

        //llegar a next es permitir que pase a la siguente funcion es decir a pokemon

    }catch (error) {

        return res.status(401).json({code: 401, message: "no tienes permiso"});

    }
}; //middleware que se aplicara a todas las rutas